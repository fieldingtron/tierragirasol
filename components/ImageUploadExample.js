import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import useImageUpload from "../hooks/useImageUpload";

/**
 * Example component demonstrating how to use the image upload functionality
 */
const ImageUploadExample = () => {
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { image, preview, error, handleImageChange, resetImage } =
    useImageUpload({
      maxSize: 1024 * 1024, // 1MB
      onError: (errorMessage) => {
        setUploadError(errorMessage);
      },
    });

  const handleUpload = async () => {
    if (!image) {
      setUploadError("Please select an image first");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedImagePath(data.path);
      resetImage();
    } catch (error) {
      setUploadError(error.message || "Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Image Upload Example</h2>

      <ImageUpload
        onImageSelect={handleImageChange}
        maxSize={1024 * 1024} // 1MB
        label="Click to upload an image"
        required={true}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {image && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      )}

      {uploadError && (
        <p className="mt-2 text-sm text-red-600">{uploadError}</p>
      )}

      {uploadedImagePath && (
        <div className="mt-4">
          <p className="text-sm text-green-600">Image uploaded successfully!</p>
          <div className="mt-2">
            <img
              src={uploadedImagePath}
              alt="Uploaded"
              className="max-h-48 mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadExample;
