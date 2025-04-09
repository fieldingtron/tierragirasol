// Install first:
// npm yarn add sharp fs path cli-progress

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');

// Configuration
const MAX_SIZE = 1500;
const JPEG_QUALITY = 60; // Lower quality for smaller file size
const PNG_COMPRESSION_LEVEL = 9; // Maximum compression

const inputDir = path.join(__dirname, 'public', 'uploads');
const backupDir = path.join(__dirname, 'public', 'backups');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function processImage(filePath) {
  const { name, ext, base, dir } = path.parse(filePath);

  try {
    const backupName = `${name}.bak${ext}`;
    const backupPath = path.join(backupDir, backupName);

    // Create a backup copy first
    fs.copyFileSync(filePath, backupPath);
    console.log(`Backup created: ${backupName}`);

    const image = sharp(backupPath);
    const metadata = await image.metadata();

    const resizeOptions = {};
    let needsResize = false;

    if (metadata.width > metadata.height) {
      if (metadata.width > MAX_SIZE) {
        resizeOptions.width = MAX_SIZE;
        needsResize = true;
      }
    } else {
      if (metadata.height > MAX_SIZE) {
        resizeOptions.height = MAX_SIZE;
        needsResize = true;
      }
    }

    let transformer = image;

    if (needsResize) {
      transformer = transformer.resize(resizeOptions);
      console.log(`Resizing: ${backupName} (original size: ${metadata.width}x${metadata.height})`);
    } else {
      console.log(`No resize needed: ${backupName} (${metadata.width}x${metadata.height})`);
    }

    if (ext.toLowerCase() === '.jpg' || ext.toLowerCase() === '.jpeg') {
      transformer = transformer.jpeg({ quality: JPEG_QUALITY });
    } else if (ext.toLowerCase() === '.png') {
      transformer = transformer.png({ compressionLevel: PNG_COMPRESSION_LEVEL });
    } else {
      console.warn(`Unsupported file type skipped: ${backupName}`);
      return;
    }

    await transformer.toFile(filePath);

    console.log(`Processed and overwritten: ${base}`);
  } catch (err) {
    console.error(`Error processing ${base}:`, err.message);
  }
}

function processAllImages() {
  fs.readdir(inputDir, async (err, files) => {
    if (err) {
      console.error('Error reading input directory:', err);
      return;
    }

    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png)$/i));

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(imageFiles.length, 0);

    for (const file of imageFiles) {
      await processImage(path.join(inputDir, file));
      progressBar.increment();
    }

    progressBar.stop();
    console.log('All images processed.');
  });
}

processAllImages();
