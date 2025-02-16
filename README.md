# AdFriend

AdFriend is a Chrome extension that transforms online advertisements into interactive, inspirational widgets. Instead of distracting ads, users see motivational quotes, activity reminders, and even earn points—helping them stay inspired while browsing and unlocking rewards as they progress.

## Features 🚀

- **Ad Replacement & Content Providers:**  
  - Automatically removes traditional ad elements (divs, iframes, images) and replaces them with inspirational widgets.
  - Supports multiple content types, including **Motivational Quotes** and **Activity Reminders**, each with its own refresh interval.

- **Enhanced Interactivity & Rewards System:**  
  - **Earn Points:**  
    - Click on a motivational quote to earn **+5 points**.
    - Mark a reminder as complete to earn **+10 points**.
  - Points are stored locally and displayed in the extension popup.
  - Unlock rewards (new themes, personalized quotes, levels) as you accumulate points.

- **User Progress Tracking:**  
  - Tracks reminder completions and user points using Chrome's local storage.
  - Real-time updates in the popup show your progress and total points.

- **Daily Notifications:**  
  - If no ads are found on a page, a notification appears:  
    *"This page is already clean! Enjoy an ad-free experience. 😊"*

- **Customizable Settings & Sync:**  
  - Choose between different content types (quotes or reminders), toggle dark mode, and refresh content manually.
  - Preferences are saved using Chrome's sync storage and update across devices.

## Installation Guide 🎥

### Video Tutorial
Watch the installation video here:  
[Installation Video](https://www.canva.com/design/DAGe_JGUcNQ/kWQ3Y13mHq_8-V1vW3wPwA/watch?utm_content=DAGe_JGUcNQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks)

### Steps
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** (top right corner).
3. Click on **Load unpacked**.
4. Select the folder containing the extension files.
5. AdFriend is now installed and ready to use!

## Usage 📌

- **Ad Replacement:**  
  - As you browse, AdFriend replaces targeted ad elements with inspiring widgets.
  
- **Popup Settings:**  
  - Click the AdFriend extension icon to access the settings popup.
  - **Content Type:** Select between "Motivational Quotes" and "Activity Reminders".
  - **Refresh Content:** Manually trigger a refresh for the active tab.
  - **Dark Mode:** Toggle dark mode for a more comfortable viewing experience.
  - **Progress & Points:** View the number of reminders completed and your current points total.

- **Earning Points & Unlocking Rewards:**  
  - Interact with the widgets to earn points:
    - **Motivational Quotes:** Click to earn **+5 points**.
    - **Activity Reminders:** Mark as complete to earn **+10 points**.
  - Use your points to unlock new rewards like themes, personalized quotes, and more.

## File Structure

- **manifest.json:**  
  Defines the extension's permissions, content scripts, background service worker, and popup UI.

- **background.js:**  
  Initializes default settings, handles messaging (including notifications when no ads are found), and sets up daily alarms.

- **content.js:**  
  Replaces ad elements with custom widgets. Implements content providers for quotes and reminders, awards points, and tracks progress.

- **popup.html:**  
  Provides the settings UI where users can change preferences, refresh content, and view their progress and points.

- **popup.js:**  
  Manages UI interactions within the popup, syncing user settings and updating progress and points displays in real time.

## Customization 🔧

- **Content Providers:**  
  Easily extend or modify the content types in **content.js** to add new features or adjust refresh intervals.

- **Styling:**  
  Customize the appearance of the widgets and popup by modifying the CSS in **content.js** and **popup.html**.

- **Rewards System:**  
  Adjust point values and reward thresholds in the code to suit your desired experience.

## Contributing 🤝

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Submit a pull request.

## Chrome Extension Landing Page 🌍

Our landing page is built with **Next.js** and provides an engaging introduction to AdFriend.

### Key Features:
- **Hero Section:**  
  Engaging headline with a strong call-to-action.
- **Key Features Overview:**  
  Highlights the extension’s benefits with icons and concise descriptions.
- **Screenshots & Demo:**  
  Visual walkthrough of the extension in action.
- **Installation Guide:**  
  Step-by-step instructions and video tutorial for installation.
- **FAQs:**  
  Answers to common questions.
- **Footer:**  
  Includes contact details, privacy policy, and social media links.

### Getting Started with the Landing Page:
1. **Prerequisites:**
   - Node.js v16+
   - npm or yarn

2. **Installation:**
   ```bash
   # Clone the repository
   git clone https://github.com/your-repo.git

   # Navigate to the landing page project folder
   cd your-landing-page

   # Install dependencies
   npm install
   # or
   yarn install

   # Run the development server
   npm run dev
   # or
   yarn dev


## License 📝

This project is licensed under the **MIT License**.

## Contact 📬

- **Email:** your-email@example.com  
- **Twitter:** [@yourhandle](https://twitter.com/yourhandle)  
- **Privacy Policy:** [View here](your-privacy-policy-link)

