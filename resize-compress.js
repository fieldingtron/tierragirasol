const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const inputDir = './public/uploads';
const maxWidthOrHeight = 1000;
const targetSizeBytes = 100 * 1024; // 100 KB
const dbPath = '.image-optimized.json';

// Load or initialize the optimization database
let optimizedDB = {};
if (fs.existsSync(dbPath)) {
  optimizedDB = JSON.parse(fs.readFileSync(dbPath));
}

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  if (!allowedExtensions.includes(ext)) {
    console.log(`Skipping unsupported file: ${filePath}`);
    return;
  }

  const hash = getFileHash(filePath);
  if (optimizedDB[filePath] === hash) {
    console.log(`Already optimized, skipping: ${filePath}`);
    return;
  }

  let img = sharp(filePath);
  const metadata = await img.metadata();

  // Resize if necessary
  const resizeOptions = {};
  if (metadata.width > metadata.height && metadata.width > maxWidthOrHeight) {
    resizeOptions.width = maxWidthOrHeight;
  } else if (metadata.height > maxWidthOrHeight) {
    resizeOptions.height = maxWidthOrHeight;
  }

  img = img.resize(resizeOptions);

  let quality = 80;
  let buffer;
  let finalFormat = ext.replace('.', '');

  do {
    buffer = await img
      .toFormat(finalFormat === 'png' ? 'png' : 'jpeg', { quality })
      .toBuffer();

    console.log(`Trying ${finalFormat} at quality ${quality}: ${buffer.length} bytes`);
    quality -= 5;
    if (quality < 30) break;
  } while (buffer.length > targetSizeBytes);

  const originalSize = fs.statSync(filePath).size;
  const resizedSize = buffer.length;

  // If it's a PNG, test WebP version
  if (ext === '.png') {
    const webpBuffer = await img.toFormat('webp', { quality: 80 }).toBuffer();
    console.log(`Checking WebP version: ${webpBuffer.length} bytes`);

    if (webpBuffer.length < resizedSize * 0.9) {
      // WebP saves at least 10%
      buffer = webpBuffer;
      finalFormat = 'webp';
      console.log(`Switched to WebP for ${filePath}`);
    }
  }

  // Determine output file path
  let outputPath = filePath;
  if (finalFormat === 'webp' && ext !== '.webp') {
    outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  fs.writeFileSync(outputPath, buffer);

  console.log(`Optimized ${outputPath}:
