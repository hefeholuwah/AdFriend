# AdFriend

AdFriend is a Chrome extension that transforms ad slots on web pages into interactive, positive content spaces. Instead of traditional ads, users see motivational quotes, activity reminders, and more—each designed to inspire, engage, and even reward the user!

## Features

- **Ad Replacement:**  
  - Replaces common ad elements (divs, iframes, images) with interactive content widgets.
  - Skips ad replacement on select domains (e.g., developer.chrome.com, chat.openai.com).

- **Content Types System:**  
  - Supports multiple content types such as **Motivational Quotes** and **Activity Reminders**.
  - Each content type has its own refresh interval and rendering style.

- **Enhanced Interactivity:**  
  - Widgets include interactive elements (e.g., clickable quotes, “Complete” buttons for reminders).
  - Buttons change styling when interacted with (active vs. completed state).
  - Points are awarded for user interactions.

- **Addiction/Reward System:**  
  - Award points for actions:  
    - +5 points for clicking a motivational quote.
    - +10 points for marking a reminder as complete.
  - Points are stored in local storage and displayed in the extension popup.
  - Potential to unlock rewards like new themes, personalized quotes, or levels.

- **User Progress Tracking:**  
  - Tracks reminder completion count and user points using `chrome.storage.local`.

- **Settings Sync:**  
  - Uses `chrome.storage.sync` to save user preferences such as content type and dark mode.
  - Changes apply immediately and are synchronized across devices.

- **Daily Notifications:**  
  - If no ads are found on a page, the extension sends a notification:
    > "This page is already clean! Enjoy an ad-free experience. 😊"

## File Structure

- **manifest.json:**  
  Defines permissions, content scripts, background service worker, and popup UI.

- **background.js:**  
  Initializes default settings, handles messaging (e.g., showing notifications when no ads are found), and sets up daily reminders via alarms.

- **content.js:**  
  Injects CSS and replaces ad elements on web pages.  
  Implements the content providers for motivational quotes and activity reminders.  
  Includes event listeners for awarding points and updating progress.

- **popup.html:**  
  Provides the extension’s settings UI, allowing users to select the content type, refresh content, toggle dark mode, and view their reminder progress and points.

- **popup.js:**  
  Handles UI interactions in the popup, syncing settings and progress, and updating the displayed user points in real time.

## Installation

1. **Clone or Download** the repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing the extension files.
5. The AdFriend extension should now appear in your browser toolbar.

## Usage

- **Ad Replacement:**  
  When browsing, AdFriend automatically replaces targeted ad elements with inspirational widgets.
  
- **Popup Settings:**  
  Click on the extension icon to open the popup.  
  - **Content Type:** Select between "Motivational Quotes" and "Activity Reminders".
  - **Refresh Content:** Manually trigger a content refresh on the active tab.
  - **Dark Mode:** Toggle a dark mode for the popup.
  - **Progress Display:** View the number of reminders completed and your current points total.

- **Earning Points:**  
  - Click a motivational quote to earn 5 points.
  - Click the “Complete” button on a reminder widget to mark it complete and earn 10 points.

## Customization

- **Content Providers:**  
  You can extend or modify the content providers in **content.js** to include additional content types or adjust refresh intervals.

- **Styling:**  
  Customize the widget appearance by editing the CSS injected in **content.js** or modifying the styles in **popup.html**.

- **Rewards System:**  
  Use the awarded points to unlock new themes, personalized quotes, or additional features. Update the logic in **content.js** and **popup.js** as needed.

## Contributing

Feel free to fork the repository and submit pull requests if you have ideas for additional features or improvements!

## License

This project is open-source and available under the [MIT License](LICENSE).

