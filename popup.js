document.addEventListener("DOMContentLoaded", () => {
    const changeMotivationBtn = document.getElementById("changeMotivationBtn");
    const contentTypeSelector = document.getElementById("contentType");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Load saved preferences
    chrome.storage.sync.get(["selectedType", "darkMode"], (data) => {
        if (data.selectedType) {
            contentTypeSelector.value = data.selectedType;
        }

        // Apply Dark Mode setting
        document.body.classList.toggle("dark-mode", data.darkMode);
        if (darkModeToggle) darkModeToggle.checked = !!data.darkMode;
    });

    // Fetch Quote Function with Error Handling
    async function fetchQuote() {
        try {
            const response = await fetch("https://zenquotes.io/api/random");
            if (!response.ok) throw new Error("API request failed");
            const data = await response.json();
            return data[0].q + " - " + data[0].a;
        } catch (error) {
            console.error("Failed to fetch quote:", error);
            return "Stay positive and keep going! 🌟";
        }
    }

    // Function to Get Random Content Based on Selection
    function getRandomContent(type) {
        const reminders = [
            "Have you done your burpees today? 🏋️‍♂️",
            "Take a deep breath and stretch! 🧘‍♂️",
            "Time to hydrate! Drink some water. 💧",
            "Smile! It makes everything better. 😊",
            "Step away from the screen for a moment! 🚶‍♂️"
        ];

        return type === "reminders"
            ? Promise.resolve(reminders[Math.floor(Math.random() * reminders.length)])
            : fetchQuote();
    }

    // Function to Update Ads on Webpage
    function updateAds(newContent) {
        document.querySelectorAll(".ad-widget p").forEach((ad) => {
            ad.textContent = newContent;
        });
    }

    // Change Motivation Button Event Listener
    changeMotivationBtn.addEventListener("click", async () => {
        const selectedType = contentTypeSelector.value;
        const newContent = await getRandomContent(selectedType);

        // Save selected type only if it has changed
        chrome.storage.sync.get(["selectedType"], (data) => {
            if (data.selectedType !== selectedType) {
                chrome.storage.sync.set({ selectedType });
            }
        });

        // Update Ads on Active Tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0 || !tabs[0].id) {
                console.warn("No active tab found.");
                return;
            }
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: updateAds,
                args: [newContent]
            });
        });
    });

    // Dark Mode Toggle Event Listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", () => {
            const isDarkMode = darkModeToggle.checked;
            document.body.classList.toggle("dark-mode", isDarkMode);
            chrome.storage.sync.set({ darkMode: isDarkMode });
        });
    }
});
