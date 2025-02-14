function replaceAds() {
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
        "[aria-label*='sponsored']", // Facebook & YouTube
        "[data-testid*='placement']", // Twitter/X ads
    ];

    let adsFound = false;

    adSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((ad) => {
            if (ad.closest("input, textarea, [contenteditable='true']")) return;
            if (ad.tagName.toLowerCase() === "img" && !ad.src.includes("ads")) return;
            if (ad.innerText.length > 50) return; // Ignore large non-ad sections

            adsFound = true;

            if (ad.tagName.toLowerCase() === "iframe" || ad.tagName.toLowerCase() === "img") {
                ad.remove();
            } else {
                ad.innerHTML = `<div class="ad-widget">${getRandomQuote()}</div>`;
                ad.style.cssText = `
                    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                `;
            }
        });
    });

    if (!adsFound) {
        console.log("No ads found.");
    } else {
        console.log("Ads replaced successfully!");
    }
}

// Function to get a random motivational quote
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

// Run the function on page load
replaceAds();

// Optimize ad checking without slowing down the page
let adCheckTimeout;
function checkForAdsEfficiently() {
    clearTimeout(adCheckTimeout);
    adCheckTimeout = setTimeout(replaceAds, 2000);
}

// Listen for user interactions to detect dynamically loaded ads
document.addEventListener("scroll", checkForAdsEfficiently);
document.addEventListener("click", checkForAdsEfficiently);
document.addEventListener("keydown", checkForAdsEfficiently);
