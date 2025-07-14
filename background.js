// Initialize blur setting on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ blurEnabled: true });
});

// Listen for toggleBlur message to update blurEnabled flag
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleBlur") {
    chrome.storage.local.get(["blurEnabled"], function (result) {
      const enable = !(result.blurEnabled === true); // Toggle the state
      chrome.storage.local.set({ blurEnabled: enable }, () => {
        sendResponse({ status: "Blur toggled", blurEnabled: enable });
      });
    });
    // Return true to indicate async sendResponse
    return true;
  }
});