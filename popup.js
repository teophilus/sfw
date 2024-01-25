const checkbox = document.getElementById("toggleCheckbox");

// Set initial state of checkbox
chrome.storage.local.get(["rulesEnabled"], function (result) {
  checkbox.checked = result.rulesEnabled === true;
});

checkbox.addEventListener("change", () => {
  chrome.runtime.sendMessage({ action: "toggleRules" }, function (response) {
    console.log(response.status); // Log the response from background.js
  });
});