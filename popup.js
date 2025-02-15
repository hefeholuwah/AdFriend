document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  //get current state from chrome storage
  chrome.storage.sync.get(["adFriendEnabled"], (result) => {
    toggle.checked = result.adFriendEnabled ?? true; //default to on
  });

  // when toggle changes, update chrome storage
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ adFriendEnabled: toggle.checked });

    // send a message to content js to enable/disable ad replacement
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: toggle.checked ? "enable" : "disable",
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log(response);
          }
        }
      );
    });
  });
});
