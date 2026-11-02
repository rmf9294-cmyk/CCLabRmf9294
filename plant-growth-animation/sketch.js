
 // original images
let scannedImages = [];

// images for plant animation
let plants;

// current index for animation
let currentPlantIndex = 0;

async function setup() {
  createCanvas(800, 500);

  // load all images first
  const imagePromises = [];
  for (let i = 0; i < 6; i++) {
    imagePromises.push(loadImage("assets/image" + i + ".jpg"));
  }
  scannedImages = await Promise.all(imagePromises);

  // erase background
  // how to use: eraseBackground(imageArray, threshold);
  eraseBackground(scannedImages, 10);

  // use all six images for plant animation
  plants = scannedImages;
}

function draw() {
  background(255);

  // EXAMPLE: PLANT

  // update plant index
  currentPlantIndex = floor((frameCount / 20) % plants.length);

  // display plant
  let currentPlant = plants[currentPlantIndex];

  // resize proportionally so the whole drawing fits
  let scaleFactor = min(
    width / currentPlant.width,
    height / currentPlant.height
  );

  image(
    currentPlant,
    (width - currentPlant.width * scaleFactor) / 2,
    (height - currentPlant.height * scaleFactor) / 2,
    currentPlant.width * scaleFactor,
    currentPlant.height * scaleFactor
  );
}

// bck remove from prof moon
function eraseBackground(images, threshold = 10) {
  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const currentImage = images[imageIndex];
    currentImage.loadPixels();

    for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
      let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
      distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

      if (distanceFromWhite < threshold) {
        currentImage.pixels[pixelIndex + 3] = 0;
      }
    }

    currentImage.updatePixels();
  }
}
