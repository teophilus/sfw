// Define classes to exclude from blur
const exclusionClasses = [
  // Add class names here to exclude elements from blurring
  "no-blur",
  ".img-fluid img",
];

// Insert CSS for blur effect
// Create a style element for blur rules
const blurStyle = document.createElement('style');
blurStyle.id = 'sfw-blur-style';

// Generate CSS rules for blur and exclusions
function getBlurCSS() {
  const exclude = exclusionClasses.map(cls => `.${cls}`).join(', ');
  const exclusionRule = exclude ? `${exclude} { filter: none !important; }` : ''; 
  return `
    /* Blur targeted images and videos */
    img[src*=".jpg"],
    img[src*=".jpeg"],
    img[src*=".webm"],
    video,
    .spot img,
    .deals .banner img,
    .adcontainer,
    .img-slider img,
    .binded img,
    [style*="background-image"],
    .deals-thumb {
      filter: blur(10px) !important;
    }
    /* Exclude specified classes */
    ${exclusionRule}
  `;
}

// Apply or remove blur by injecting or removing the style
function updateBlur(enabled) {
  if (enabled) {
    blurStyle.textContent = getBlurCSS();
    if (!document.head.contains(blurStyle)) {
      document.head.appendChild(blurStyle);
    }
  } else {
    const existing = document.getElementById('sfw-blur-style');
    existing && existing.remove();
  }
}

// Listen for blurEnabled changes
chrome.storage.local.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.blurEnabled) {
    updateBlur(changes.blurEnabled.newValue === true);
  }
});

// Initialize blur state
chrome.storage.local.get(['blurEnabled'], result => {
  updateBlur(result.blurEnabled === true);
});
