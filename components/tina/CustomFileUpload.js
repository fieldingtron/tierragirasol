import React from "react";
import { useState } from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export function CustomFileUpload({ input, field }) {
  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError(`File is too large. Max size is 2MB.`);
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      input.onChange(data.secure_url);
    } else {
      setError("Upload failed.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {input.value && (
        <div style={{ marginTop: "10px" }}>
          <img src={input.value} alt="Uploaded" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
}
