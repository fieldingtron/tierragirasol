/**
 * Utility functions for file validation
 */

// Maximum file size in bytes (1MB)
export const MAX_FILE_SIZE = 1024 * 1024;

/**
 * Validates if a file meets size requirements
 * @param {File} file - The file to validate
 * @param {number} maxSize - Maximum file size in bytes (default: 1MB)
 * @returns {Object} - Validation result with isValid and message
 */
export const validateFileSize = (file, maxSize = MAX_FILE_SIZE) => {
  if (!file) {
    return { isValid: false, message: "No file provided" };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      message: `File size exceeds the limit of ${maxSize / (1024 * 1024)}MB`,
    };
  }

  return { isValid: true, message: "" };
};

/**
 * Validates if a file is an image
 * @param {File} file - The file to validate
 * @returns {Object} - Validation result with isValid and message
 */
export const validateImageType = (file) => {
  if (!file) {
    return { isValid: false, message: "No file provided" };
  }

  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      message: "Only JPEG, PNG, GIF, and WebP images are allowed",
    };
  }

  return { isValid: true, message: "" };
};

/**
 * Comprehensive file validation for images
 * @param {File} file - The file to validate
 * @param {number} maxSize - Maximum file size in bytes (default: 1MB)
 * @returns {Object} - Validation result with isValid and message
 */
export const validateImage = (file, maxSize = MAX_FILE_SIZE) => {
  const sizeValidation = validateFileSize(file, maxSize);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }

  const typeValidation = validateImageType(file);
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  return { isValid: true, message: "" };
};
