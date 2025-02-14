document.addEventListener("DOMContentLoaded", () => {
    const contentTypeSelect = document.getElementById("contentType");
    const changeMotivationBtn = document.getElementById("changeMotivationBtn");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Load saved preferences
    chrome.storage.sync.get(["contentType", "darkMode"], (data) => {
        if (data.contentType) {
            contentTypeSelect.value = data.contentType;
        }
        if (data.darkMode) {
            document.body.classList.add("dark-mode");
            darkModeToggle.checked = true;
        }
    });

    // Save content type preference
    contentTypeSelect.addEventListener("change", () => {
        chrome.storage.sync.set({ contentType: contentTypeSelect.value });
    });

    // Change motivation manually
    changeMotivationBtn.addEventListener("click", () => {
        alert("Motivational content will be refreshed!");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: replaceAds,
            });
        });
    });

    // Dark mode toggle
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            document.body.classList.add("dark-mode");
            chrome.storage.sync.set({ darkMode: true });
        } else {
            document.body.classList.remove("dark-mode");
            chrome.storage.sync.set({ darkMode: false });
        }
    });

    // Function to refresh ads with motivational content
    function replaceAds() {
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
        
        document.querySelectorAll(".ad-widget").forEach(ad => {
            ad.innerText = quotes[Math.floor(Math.random() * quotes.length)];
        });
    }
});
