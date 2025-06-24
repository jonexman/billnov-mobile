const fs = require("fs");
const path = require("path");

// List of required image assets
const requiredImages = [
  "splash.png",
  "dantown-logo.png",
  "onboarding-1.png",
  "onboarding-2.png",
  "onboarding-3.png",
  "onboarding-4.png",
  "refer-friend.png",
  "copy-code.png",
  "share-link.png",
  "earn-rewards.png",
  "btc.png",
  "eth.png",
  "usdt.png",
  "ltc.png",
  "btc-chart.png",
  "eth-chart.png",
  "usdt-chart.png",
  "ltc-chart.png",
  "promo-banner.png",
];

// Create the assets/images directory if it doesn't exist
const imagesDir = path.join(__dirname, "assets", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log("Created assets/images directory");
}

// Generate a simple placeholder SVG for each required image
requiredImages.forEach((imageName) => {
  const filePath = path.join(imagesDir, imageName);

  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`${imageName} already exists, skipping`);
    return;
  }

  // Create a simple SVG placeholder
  const name = path.basename(imageName, path.extname(imageName));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#CCCCCC"/>
    <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#666666" text-anchor="middle" dominant-baseline="middle">${name}</text>
  </svg>`;

  fs.writeFileSync(filePath, svg);
  console.log(`Created placeholder for ${imageName}`);
});

console.log("All placeholder images generated successfully!");
