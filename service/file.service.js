const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class FileService {
  async save(file) {
    try {
      const maxSize = 50 * 1024 * 1024;
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
        await picture.mv(filePath);
        fileNames.push(fileName);
      }

      return fileNames
    } catch (error) {
      throw new Error(`Error saving file: ${error}`);
    }
  }


  async deleteFile(fileNames) {
    try {
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static");

      if (!Array.isArray(fileNames)) {
        // Agar bitta rasm nomi kelgan bo'lsa, uni massivga aylantiramiz
        fileNames = [fileNames];
      }

      for (const fileName of fileNames) {
        const filePath = path.join(staticDir, fileName);

        // Faylning mavjudligini tekshirish
        if (fs.existsSync(filePath)) {
          // Faylni o'chirish
          fs.unlinkSync(filePath);
        } else {
          console.warn(`Ogohlantirish: Fayl topilmadi, o'chirib yuborilmadi: ${fileName}`);
        }
      }
      return true;
    } catch (error) {
      // Agar o'chirishda xatolik yuz bersa (ruxsatlar, blokirovka va h.k.)
      throw new Error(`Faylni o'chirishda xatolik: ${error.message}`);
    }
  }
}

module.exports = new FileService();
