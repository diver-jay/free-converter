/**
 * Get file extension from filename
 * @param {File|string} file - File object or filename string
 * @returns {string|null} - File extension (e.g., ".pdf") or null if not found
 */
export const getFileExtension = (file) => {
  const fileName = typeof file === "string" ? file : file?.name;
  if (!fileName) return null;
  return fileName.toLowerCase().match(/\.[^.]+$/)?.[0] || null;
};

/**
 * Check if the file matches any of the allowed extensions
 * @param {File|string} file - File object or filename string
 * @param {string[]} allowedExtensions - Array of allowed extensions (e.g., [".pdf", ".docx"])
 * @returns {boolean} - True if file extension matches, false otherwise
 */
export const isFileType = (file, allowedExtensions) => {
  const fileExt = getFileExtension(file);
  return fileExt ? allowedExtensions.includes(fileExt) : false;
};
