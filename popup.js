const checkbox = document.getElementById("toggleCheckbox");

// Set initial state of checkbox based on blurEnabled flag
chrome.storage.local.get(["blurEnabled"], function (result) {
  checkbox.checked = result.blurEnabled === true;
});

checkbox.addEventListener("change", () => {
  chrome.runtime.sendMessage({ action: "toggleBlur" }, function (response) {
    console.log(response.status); // Log the response from background.js
    // Update checkbox state in case of async change
    if (response.blurEnabled !== undefined) {
      checkbox.checked = response.blurEnabled;
    }
  });
});