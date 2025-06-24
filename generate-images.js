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
  "splash-icon.png",
];

// Create a simple 1x1 pixel PNG (transparent)
const transparentPixelPNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

// Create a simple 1x1 pixel PNG (blue)
const bluePixelPNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==",
  "base64"
);

// Create a simple 1x1 pixel PNG (white)
const whitePixelPNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
  "base64"
);

// Create the assets/images directory if it doesn't exist
const imagesDir = path.join(__dirname || ".", "assets", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log("Created assets/images directory");
}

// Generate placeholder images
requiredImages.forEach((imageName) => {
  const filePath = path.join(imagesDir, imageName);

  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`${imageName} already exists, skipping`);
    return;
  }

  // Choose which pixel to use based on the image name
  let pixelData;
  if (imageName.includes("logo") || imageName.includes("splash")) {
    pixelData = whitePixelPNG;
  } else if (
    imageName.includes("chart") ||
    imageName.includes("btc") ||
    imageName.includes("eth") ||
    imageName.includes("usdt") ||
    imageName.includes("ltc")
  ) {
    pixelData = bluePixelPNG;
  } else {
    pixelData = transparentPixelPNG;
  }

  fs.writeFileSync(filePath, pixelData);
  console.log(`Created placeholder for ${imageName}`);
});

console.log("All placeholder images generated successfully!");
