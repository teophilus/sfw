# How to install

Inside of Chrome/Canary/Brave

Visit chrome://extensions/

Turn on "developer mode"

Click "Load unpacked"

Navigate to local repo folder and enjoy!

<!-- Add instructions for exclusion classes -->
## Exclusion List

To exclude specific elements from being blurred, add their class names to the `exclusionClasses` array in `content.js` (default class is `no-blur`). You can also add the `no-blur` class directly to any `<img>` or `<video>` element in the page's HTML to prevent it from being blurred.
