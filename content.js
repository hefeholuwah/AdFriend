function replaceAds() {
    const adSelectors = [
      'div[class*="ad"]',
      'iframe[src*="ads"]',
      "img[src*='ad']",
      "ins.adsbygoogle"
    ];
  
    adSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((ad) => {
        if (ad.tagName.toLowerCase() === "iframe" || ad.tagName.toLowerCase() === "img") {
          ad.remove();
        } else {
          ad.innerHTML = `<div class="ad-widget">
            <p>${getRandomQuote()}</p>
          </div>`;
          ad.style.backgroundColor = "#f0f8ff";
          ad.style.padding = "10px";
          ad.style.borderRadius = "5px";
        }
      });
    });
  }
  
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
  
  // Run the function to replace ads initially
  replaceAds();
  