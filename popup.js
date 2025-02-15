document.addEventListener("DOMContentLoaded", () => {
    const contentTypeSelect = document.getElementById("contentType");
    const refreshContentBtn = document.getElementById("refreshContentBtn");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const reminderProgressDiv = document.getElementById("reminderProgress");
    const progressCountSpan = document.getElementById("progressCount");
  
    // Load saved preferences from chrome.storage.sync
    chrome.storage.sync.get(["contentType", "darkMode"], (data) => {
      if (data.contentType) {
        contentTypeSelect.value = data.contentType;
      }
      if (data.darkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
      }
      // Update the reminder progress display based on content type
      toggleReminderProgressDisplay(data.contentType);
    });
  
    // Load reminder progress from chrome.storage.local
    function updateReminderProgress() {
      chrome.storage.local.get({ reminderProgress: 0 }, (result) => {
        progressCountSpan.innerText = result.reminderProgress;
      });
    }
    updateReminderProgress();
  
    // When the content type is changed, save the new value and update UI
    contentTypeSelect.addEventListener("change", () => {
      const newType = contentTypeSelect.value;
      chrome.storage.sync.set({ contentType: newType }, () => {
        console.log("Content type updated to:", newType);
        toggleReminderProgressDisplay(newType);
        // Optionally, notify active tabs about the change
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "updateContentType", newType });
          }
        });
      });
    });
  
    // Refresh content button: triggers a content refresh in the active tab
    refreshContentBtn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
              if (typeof refreshAds === "function") {
                refreshAds();
              }
            },
          });
        }
      });
    });
  
    // Dark mode toggle changes
    darkModeToggle.addEventListener("change", () => {
      if (darkModeToggle.checked) {
        document.body.classList.add("dark-mode");
        chrome.storage.sync.set({ darkMode: true });
      } else {
        document.body.classList.remove("dark-mode");
        chrome.storage.sync.set({ darkMode: false });
      }
    });
  
    // Helper function to show or hide the reminder progress UI based on content type
    function toggleReminderProgressDisplay(type) {
      if (type === "reminders") {
        reminderProgressDiv.style.display = "block";
        updateReminderProgress();
      } else {
        reminderProgressDiv.style.display = "none";
      }
    }
  
    // Listen for changes in local storage (e.g., reminder progress updates)
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.reminderProgress) {
        updateReminderProgress();
      }
    });
  });
  