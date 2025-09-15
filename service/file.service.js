const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class FileService {
  save(file) {
    try {
      const maxSize = 3 * 1024 * 1024;
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static");
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      const pictures = Array.isArray(file.pictures) ? file.pictures : [file.pictures]
      const fileNames = []

      for (let picture of pictures) {
        if (picture.size > maxSize) {
          throw new Error("Rasm 3 MB dan oshmasligi kerak");
        }

        const fileExtension = path.extname(picture.name).toLowerCase();
        // Fayl formatini tekshirish
        if (!allowedExtensions.includes(fileExtension)) {
          throw new Error("Fayl formati ruxsat etilmagan");
        }
        const fileName = uuidv4() + ".jpg";
        const filePath = path.join(staticDir, fileName);
        picture.mv(filePath);
        fileNames.push(fileName);
      }

      return fileNames
    } catch (error) {
      throw new Error(`Error saving file: ${error}`);
    }
  }
}

module.exports = new FileService();
