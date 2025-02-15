// content.js

// Inject some CSS for widget styling and animation
const style = document.createElement('style');
style.innerHTML = `
  .ad-widget {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    color: white;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  .ad-widget.fade-in {
    opacity: 1;
  }
  .reminder-widget {
    position: relative;
  }
  .progress-circle {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    /* Add your progress circle styling or SVG here */
  }
  /* Style for interactive 'Complete' button */
  .ad-widget button.mark-complete {
    background-color: #007BFF; /* blue for active state */
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  .ad-widget button.mark-complete:hover {
    background-color: #0056b3;
  }
  /* Disabled/Completed state */
  .ad-widget button.mark-complete.completed {
    background-color: #6c757d; /* gray for completed state */
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);

// Default content type if none is set
let currentContentType = 'quotes';

// Define content providers
const contentProviders = {
  quotes: {
    getContent: getRandomQuote,
    refreshInterval: 10000, // Refresh every 10 seconds
    render: function(ad) {
      ad.innerHTML = `<div class="ad-widget fade-in">${this.getContent()}</div>`;
    }
  },
  reminders: {
    getContent: getRandomReminder,
    refreshInterval: 15000, // Refresh every 15 seconds
    render: function(ad) {
      ad.innerHTML = `
        <div class="ad-widget reminder-widget fade-in">
          ${this.getContent()}
          <button class="mark-complete">Complete</button>
          <div class="progress-circle"></div>
        </div>
      `;
      // Attach event listener for completion tracking
      const completeBtn = ad.querySelector('.mark-complete');
      if (completeBtn) {
        completeBtn.addEventListener('click', () => {
          markReminderCompleted();
          completeBtn.disabled = true;
          completeBtn.classList.add('completed'); // change styling to completed state
          completeBtn.innerText = 'Completed';
        });
      }
    }
  }
};

// Content provider functions
function getRandomQuote() {
  const quotes = [
    "You can't start the next chapter of your life if you keep re-reading the last.",
    "The best way to predict the future is to create it.",
    "You got this! 💪",
    "Take a deep breath and smile. 😊",
    "Small steps lead to big results. 🚀",
    "Stay positive and keep going! 🌟",
    "Believe in yourself and all that you are. 💖",
    "Every day is a fresh start. 🌅",
    "Your only limit is your mind. 🚀",
    "Don't stop until you're proud. 🌟"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomReminder() {
  const reminders = [
    "Have you done your burpees today?",
    "Time to stretch and take a short walk!",
    "Remember to hydrate. Drink a glass of water!",
    "Take a deep breath and relax your shoulders.",
    "How about a quick meditation break?"
  ];
  return reminders[Math.floor(Math.random() * reminders.length)];
}

// Update local progress when a reminder is marked complete
function markReminderCompleted() {
  chrome.storage.local.get({ reminderProgress: 0 }, (result) => {
    const newProgress = result.reminderProgress + 1;
    chrome.storage.local.set({ reminderProgress: newProgress }, () => {
      console.log(`Reminder completed! Total: ${newProgress}`);
    });
  });
}

// Replace ad elements with our custom content widgets
function replaceAds() {
  // Skip certain domains if needed
  if (
    location.hostname.includes("developer.chrome.com") ||
    location.hostname.includes("chat.openai.com") ||
    location.hostname.includes("deepseek.com")
  ) {
    console.log("Skipping ad replacement on this site.");
    return;
  }

  const adSelectors = [
    'div[class^="ad-"]',
    'div[class$="-ad"]',
    'iframe[src*="ads"]',
    "img[src*='ad']",
    "ins.adsbygoogle",
    "div[id^='ad-']",
    "div[id*='google_ads']",
    "[aria-label*='sponsored']",
    "[data-testid*='placement']",
  ];

  let adsFound = false;

  adSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((ad) => {
      // Skip if inside editable areas or non-ad images
      if (ad.closest("input, textarea, [contenteditable='true']")) return;
      if (ad.tagName.toLowerCase() === "img" && !ad.src.includes("ads")) return;
      if (ad.innerText.length > 50) return;

      adsFound = true;
      if (ad.tagName.toLowerCase() === "iframe" || ad.tagName.toLowerCase() === "img") {
        ad.remove();
      } else {
        // Render using the appropriate content provider
        if (contentProviders[currentContentType]) {
          contentProviders[currentContentType].render(ad);
        } else {
          contentProviders['quotes'].render(ad);
        }
      }
    });
  });

  if (!adsFound) {
    console.log("No ads found.");
    // Send a message to background.js to show a notification
    chrome.runtime.sendMessage({ action: "noAdsFound" });
  } else {
    console.log("Ads replaced successfully!");
  }
}

// Periodically refresh content within widgets
function refreshAds() {
  document.querySelectorAll('.ad-widget').forEach(widget => {
    // Re-render content based on the current provider
    widget.parentElement && contentProviders[currentContentType].render(widget.parentElement);
  });
}

// Optimize ad checking without slowing down the page
let adCheckTimeout;
function checkForAdsEfficiently() {
  clearTimeout(adCheckTimeout);
  adCheckTimeout = setTimeout(replaceAds, 2000);
}
document.addEventListener("scroll", checkForAdsEfficiently);
document.addEventListener("click", checkForAdsEfficiently);
document.addEventListener("keydown", checkForAdsEfficiently);

// Listen for changes in sync storage (e.g., when user changes content type)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.contentType) {
    currentContentType = changes.contentType.newValue;
    console.log("Content type updated to:", currentContentType);
    // Re-render all widgets with the new content type
    document.querySelectorAll('.ad-widget').forEach(widget => {
      widget.parentElement && contentProviders[currentContentType].render(widget.parentElement);
    });
  }
});

// Initial load: get the user's content type, replace ads, and start the refresh interval
chrome.storage.sync.get(['contentType'], (data) => {
  if (data.contentType) {
    currentContentType = data.contentType;
  }
  replaceAds();
  // Set up interval-based content refresh based on the current provider's setting
  setInterval(refreshAds, contentProviders[currentContentType].refreshInterval);
});
