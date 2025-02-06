// Import the chrome runtime API
//This line is added to fix the undeclared chrome variable error.
const chrome = chrome

document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content")
  const toggleButton = document.getElementById("toggleButton")

  chrome.storage.sync.get(["enabled", "quote", "reminder"], (data) => {
    const enabled = data.enabled ?? true
    const quote = data.quote ?? "Believe you can and you're halfway there."
    const reminder = data.reminder ?? "Have you done your burpees today?"

    contentDiv.innerHTML = `
      <p class="mb-2"><strong>Quote:</strong> ${quote}</p>
      <p class="mb-2"><strong>Reminder:</strong> ${reminder}</p>
    `

    toggleButton.textContent = enabled ? "Disable AdFriend" : "Enable AdFriend"
  })

  toggleButton.addEventListener("click", () => {
    chrome.storage.sync.get("enabled", (data) => {
      const newEnabled = !(data.enabled ?? true)
      chrome.storage.sync.set({ enabled: newEnabled }, () => {
        toggleButton.textContent = newEnabled ? "Disable AdFriend" : "Enable AdFriend"
      })
    })
  })
})

