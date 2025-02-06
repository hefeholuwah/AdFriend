const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

// In-memory user storage (replace with a database in production)
const users = []

// JWT secret key (use a strong, randomly generated key in production)
const JWT_SECRET = "your-secret-key"

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({ name, email, password: hashedPassword })
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error creating user" })
  }
})

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = users.find((u) => u.email === email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" })
      res.json({ token })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" })
  }
})

// Protected route for saving user preferences
app.post("/preferences", authenticateToken, (req, res) => {
  const { quote, reminder } = req.body
  // TODO: Save preferences to a database
  res.json({ message: "Preferences saved successfully" })
})

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

