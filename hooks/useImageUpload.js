import { useState } from "react";
import { validateImage } from "../utils/fileValidation";

/**
 * Custom hook for handling image uploads with validation
 * @param {Object} options - Configuration options
 * @param {number} options.maxSize - Maximum file size in bytes (default: 1MB)
 * @param {Function} options.onUpload - Callback function when a valid image is selected
 * @param {Function} options.onError - Callback function when validation fails
 * @returns {Object} - Image upload state and handlers
 */
const useImageUpload = ({
  maxSize = 1024 * 1024,
  onUpload = () => {},
  onError = () => {},
} = {}) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file) => {
    setError("");

    if (!file) {
      setImage(null);
      setPreview("");
      return;
    }

    // Validate the file
    const validation = validateImage(file, maxSize);
    if (!validation.isValid) {
      setError(validation.message);
      setImage(null);
      setPreview("");
      onError(validation.message);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Set the image
    setImage(file);
    onUpload(file);
  };

  const resetImage = () => {
    setImage(null);
    setPreview("");
    setError("");
  };

  return {
    image,
    preview,
    error,
    isLoading,
    handleImageChange,
    resetImage,
    setError,
    setIsLoading,
  };
};

export default useImageUpload;
