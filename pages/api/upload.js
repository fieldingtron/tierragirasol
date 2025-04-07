import formidable from "formidable";
import fs from "fs";
import path from "path";
import { MAX_FILE_SIZE } from "../../utils/fileValidation";

// Disable the default body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Server-side validation for image uploads
 * @param {Object} file - The uploaded file object
 * @returns {Object} - Validation result with isValid and message
 */
const validateUploadedFile = (file) => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      message: `File size exceeds the limit of ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB`,
    };
  }

  // Check file type
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validTypes.includes(file.mimetype)) {
    return {
      isValid: false,
      message: "Only JPEG, PNG, GIF, and WebP images are allowed",
    };
  }

  return { isValid: true, message: "" };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Configure formidable
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE,
      filter: ({ mimetype }) => {
        return mimetype && mimetype.includes("image");
      },
    });

    // Parse the form data
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.image || files.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate the file
    const validation = validateUploadedFile(file);
    if (!validation.isValid) {
      // Delete the uploaded file if validation fails
      if (fs.existsSync(file.filepath)) {
        fs.unlinkSync(file.filepath);
      }
      return res.status(400).json({ error: validation.message });
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const extension = path.extname(file.originalFilename);
    const filename = `${timestamp}${extension}`;
    const newPath = path.join(uploadDir, filename);

    // Rename the file
    fs.renameSync(file.filepath, newPath);

    // Return the file path
    return res.status(200).json({
      success: true,
      path: `/uploads/${filename}`,
      filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Error uploading file" });
  }
}
