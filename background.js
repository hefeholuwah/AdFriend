// background.js

// Initialize extension settings on install
chrome.runtime.onInstalled.addListener(() => {
  console.log("AdFriend installed! 🎉");
  chrome.storage.sync.set(
    {
      adReplacementEnabled: true,
      contentType: "quotes", // Default content type: 'quotes'
      darkMode: false,
    },
    () => {
      console.log("Default settings saved.");
    }
  );
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Replace ads request from popup or other parts of the extension
  if (message.action === "replaceAds") {
    console.log("Received request to replace ads.");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "replaceAds" });
      }
    });
  }

  // Retrieve settings
  if (message.action === "getSettings") {
    chrome.storage.sync.get(
      ["adReplacementEnabled", "contentType", "darkMode"],
      (data) => {
        sendResponse(data);
      }
    );
    return true; // Ensures asynchronous sendResponse works
  }

  // Notify user if no ads were found
  if (message.action === "noAdsFound") {
    console.log("No ads found on this page.");
    chrome.notifications.create("no-ads-notification", {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/Adfriend128.png"),
      title: "No Ads Found 🎉",
      message: "This page is already clean! Enjoy an ad-free experience. 😊",
    });
  }

  // Handle content type updates from the popup (if additional actions are needed)
  if (message.action === "updateContentType") {
    console.log("Content type updated to:", message.newType);
    // Additional logic can be added here if needed
  }
});

// Schedule a daily reminder using Chrome Alarms
chrome.alarms.create("dailyReminder", {
  when: Date.now() + 1000, // Start in 1 second
  periodInMinutes: 24 * 60, // Repeat every 24 hours
});

// Listen for alarm events
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
