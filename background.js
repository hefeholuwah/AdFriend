// Initialize extension settings on install
chrome.runtime.onInstalled.addListener(() => {
  console.log("AdFriend installed! 🎉");

  // Set default settings in chrome.storage.sync
  chrome.storage.sync.set({ adReplacementEnabled: true }, () => {
    console.log("Default settings saved.");
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceAds") {
    console.log("Received request to replace ads.");

    // Send message to the active tab to replace ads
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "replaceAds" });
      }
    });
  }

  if (message.action === "getSettings") {
    // Retrieve settings from storage and send them back
    chrome.storage.sync.get(["adReplacementEnabled"], (data) => {
      sendResponse(data);
    });
    return true; // Ensures sendResponse works asynchronously
  }

  // ✅ Detect when no ads were found and notify the user
  if (message.action === "noAdsFound") {
    console.log("No ads found on this page.");
    chrome.notifications.create("no-ads-notification", {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/Adfriend128.png"),
      title: "No Ads Found 🎉",
      message: "This page is already clean! Enjoy an ad-free experience. 😊",
    });
  }
});

// Show popup on every new tab or page load
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && !tab.url.startsWith("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: openPopup
    });
  }
});

// Function to open the popup
function openPopup() {
  chrome.runtime.sendMessage({ action: "openPopup" });
}

// Schedule a daily reminder using Chrome Alarms
chrome.alarms.create("dailyReminder", {
  when: Date.now() + 1000, // Start in 1 second
  periodInMinutes: 24 * 60, // Repeat every 24 hours
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyReminder") {
    chrome.notifications.create("daily-reminder", {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/Adfriend128.png"),
      title: "AdFriend Reminder",
      message: "Have you taken a break today? 🌟",
    });
  }
});