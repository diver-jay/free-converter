import { getFileExtension, isFileType } from "./fileTypeDetection";

describe("fileTypeDetection", () => {
  describe("getFileExtension", () => {
    it("should return file extension from File object", () => {
      const file = { name: "test.pdf" };
      expect(getFileExtension(file)).toBe(".pdf");
    });

    it("should return file extension from filename string", () => {
      expect(getFileExtension("document.docx")).toBe(".docx");
    });

    it("should return lowercase extension", () => {
      expect(getFileExtension("VIDEO.MP4")).toBe(".mp4");
    });

    it("should return null for file without extension", () => {
      expect(getFileExtension("noextension")).toBeNull();
    });

    it("should return null for null/undefined input", () => {
      expect(getFileExtension(null)).toBeNull();
      expect(getFileExtension(undefined)).toBeNull();
    });

    it("should handle multiple dots in filename", () => {
      expect(getFileExtension("my.file.name.pdf")).toBe(".pdf");
    });
  });

  describe("isFileType", () => {
    const videoExtensions = [".webm", ".mp4", ".mov", ".avi", ".mkv", ".flv"];
    const documentExtensions = [".pdf", ".docx"];

    it("should return true for matching file types", () => {
      expect(isFileType({ name: "video.mp4" }, videoExtensions)).toBe(true);
      expect(isFileType("document.pdf", documentExtensions)).toBe(true);
    });

    it("should return true for uppercase extensions", () => {
      expect(isFileType("VIDEO.MP4", videoExtensions)).toBe(true);
      expect(isFileType({ name: "FILE.PDF" }, documentExtensions)).toBe(true);
    });

    it("should return false for non-matching file types", () => {
      expect(isFileType({ name: "video.mp4" }, documentExtensions)).toBe(
        false
      );
      expect(isFileType("document.pdf", videoExtensions)).toBe(false);
    });

    it("should return false for unsupported file types", () => {
      expect(isFileType("audio.mp3", videoExtensions)).toBe(false);
      expect(isFileType("image.jpg", documentExtensions)).toBe(false);
    });

    it("should return false for null/undefined file", () => {
      expect(isFileType(null, videoExtensions)).toBe(false);
      expect(isFileType(undefined, documentExtensions)).toBe(false);
    });

    it("should return false for empty allowed extensions", () => {
      expect(isFileType("file.pdf", [])).toBe(false);
    });

    it("should work with single extension in array", () => {
      expect(isFileType("file.pdf", [".pdf"])).toBe(true);
      expect(isFileType("file.docx", [".pdf"])).toBe(false);
    });

    it("should be case insensitive", () => {
      expect(isFileType("FILE.PDF", [".pdf"])).toBe(true);
      expect(isFileType("VIDEO.MP4", [".mp4"])).toBe(true);
    });
  });
});
