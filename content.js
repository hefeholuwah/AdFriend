// function to replace and detect ads
function replaceAds() {
  // select common ad elements
  const adSelectors = [
    'div[class*="ad"]',
    'iframe[src*="ads"]',
    "img[src*='ad']",
    "ins.adsbygoogle",
  ];

  adSelectors.forEach((selector) => {
    const ads = document.querySelectorAll(selector);
    ads.forEach((ad) => {
      //replace the adds with custom widgets
      ad.innerHTML = ` 
            <div class = "ad-widget">
                <p>${getRandomQuote()}</p>
                </div>
                `;
      ad.style.backgroundColor = "#f0f8ff"; // Light blue background
      ad.style.padding = "10px";
      ad.style.borderRadius = "5px";
    });
  });
}

function getRandomQuote() {
  const quotes = [
    "You can't start the next chapter of your life if you keep re-reading the last",
    "The best way to predict the future is to create it",
    "You got this! 💪",
    "Take a deep breath and smile. 😊",
    "Have you done your burpees today? 🏋️‍♂️",
    "Small steps lead to big results. 🚀",
    "Stay positive and keep going! 🌟",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Run the function to replace ads
replaceAds();
