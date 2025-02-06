# AdFriend Chrome Extension

AdFriend is a Chrome extension that transforms ad spaces into positive, motivational content. This project includes a Next.js landing page, authentication system, and an Express.js backend.

## Project Structure

\`\`\`
adfriend/
├── README.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── postcss.config.mjs
├── public
│   ├── content.js
│   ├── file.svg
│   ├── globe.svg
│   ├── manifest.json
│   ├── next.svg
│   ├── popup.html
│   ├── popup.js
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── pages
│   │   ├── dashboard.jsx
│   │   ├── index.jsx
│   │   ├── login.jsx
│   │   └── signup.jsx
│   └── server
│       └── server.js
├── tailwind.config.js
└── tailwind.config.mjs
\`\`\`

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Google Chrome browser

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/adfriend.git
   cd adfriend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

### Running the Project

1. Start the Next.js development server:
   \`\`\`
   npm run dev
   \`\`\`

2. Start the Express.js server:
   \`\`\`
   node src/server/server.js
   \`\`\`

3. Build the Chrome extension:
   \`\`\`
   npm run build
   \`\`\`

4. Load the extension in Chrome:
   - Open Google Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `public` folder in your project directory

### Usage

1. Open the landing page at `http://localhost:3000`
2. Sign up for an account or log in
3. Customize your motivational quotes and activity reminders on the dashboard
4. Enable the AdFriend extension in Chrome to start replacing ads with positive content

## Project Components

### Next.js Frontend

- `src/pages/index.jsx`: The landing page component.
- `src/pages/login.jsx`: The login page component.
- `src/pages/signup.jsx`: The signup page component.
- `src/pages/dashboard.jsx`: The dashboard component for customizing content.

### Chrome Extension Files

- `public/manifest.json`: The manifest file for the Chrome extension.
- `public/popup.html`: The HTML file for the extension's popup.
- `public/popup.js`: The JavaScript file that controls the behavior of the popup.
- `public/content.js`: The content script that runs on web pages.

### Express.js Backend

- `src/server/server.js`: The Express.js server that handles user authentication and preference storage.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

