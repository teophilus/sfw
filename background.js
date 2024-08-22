chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "toggleRules") {
    // Perform the toggle action
    chrome.storage.local.get(["rulesEnabled"], function (result) {
      const enable = !(result.rulesEnabled === true); // Toggle the state

      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: enable ? ["ruleset_1"] : [],
        disableRulesetIds: enable ? [] : ["ruleset_1"],
      });

      chrome.storage.local.set({ rulesEnabled: enable });
    });    
    // You can also send a response back if needed
    sendResponse({ status: "Rules toggled" });
  }
});