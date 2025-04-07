import React, { useState, useRef } from "react";
import { validateImage } from "../utils/fileValidation";

/**
 * A reusable image upload component with file size validation
 */
const ImageUpload = ({
  onImageSelect,
  maxSize = 1024 * 1024, // 1MB default
  accept = "image/jpeg,image/png,image/gif,image/webp",
  className = "",
  label = "Upload Image",
  required = false,
  name = "image",
}) => {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) {
      if (required) {
        setError("Please select an image");
      }
      setPreview("");
      onImageSelect(null);
      return;
    }

    // Validate the file
    const validation = validateImage(file, maxSize);
    if (!validation.isValid) {
      setError(validation.message);
      setPreview("");
      onImageSelect(null);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Pass the file to parent component
    onImageSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onClick={handleClick}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white">Click to change</span>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">{label}</p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSize / (1024 * 1024)}MB
            </p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        name={name}
        required={required}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUpload;
