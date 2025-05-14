const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const sanitizeFilename = (filename) => {
  // Get the file extension
  const ext = filename.substring(filename.lastIndexOf("."));
  const name = filename.substring(0, filename.lastIndexOf("."));

  return (
    removeDiacritics(name)
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]/g, "-") // Replace special characters with hyphens
      .replace(/-+/g, "-") // Remove duplicate hyphens
      .replace(/^-+|-+$/g, "") + // Remove leading/trailing hyphens
    ext.toLowerCase()
  ); // Add back the extension in lowercase
};
