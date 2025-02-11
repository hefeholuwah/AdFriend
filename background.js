// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("AdFriend installed! 🎉");
  // Set default settings
  chrome.storage.local.set({ adReplacementEnabled: true }, () => {
    console.log("Default settings saved.");
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceAds") {
    console.log("Received request to replace ads.");
    // Send a message to the active tab to replace ads
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "replaceAds" });
      }
    });
  }

  if (message.action === "getSettings") {
    // Retrieve settings from storage and send them back
    chrome.storage.local.get(["adReplacementEnabled"], (data) => {
      sendResponse(data);
    });
    return true; // Required for async sendResponse
  }
});

// Example: Schedule a daily reminder
function scheduleDailyReminder() {
  const now = new Date();
  const reminderTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    9,
    0,
    0
  ); // 9:00 AM
  if (now > reminderTime) {
    reminderTime.setDate(reminderTime.getDate() + 1); // Set for next day if time has passed
  }
  const timeout = reminderTime.getTime() - now.getTime();

  setTimeout(() => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/AdFriend128.png",
      title: "AdFriend Reminder",
      message: "Have you taken a break today? 🌟",
    });
    scheduleDailyReminder(); // Reschedule for the next day
  }, timeout);
}

// Start the reminder scheduler
scheduleDailyReminder();
