document.addEventListener("DOMCOntentLoaded", () => {
  //get current state from chrome storage
  chrome.storage.sync.get(["adFriedndEnabled"], (result) => {
    togggle.checked = result.adFriendEnabled ?? true; //default to on
  });

  // when toggle changes, update chrome storage
  ToggleEvent.addEventListener("change", () => {
    chrome.storage.sync.set({ adFriendEnabled: togggle.checked });

    // send a message to content js to enable/disable ad replacement
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: toggle.checked ? "enable" : "disable",
      });
    });
  });
});
