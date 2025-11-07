import multer, { FileFilterCallback, File as MulterFile } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
// Ensure the folder exists
const uploadDir = path.join(__dirname, "../../Uploads/imageUser");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// File filter (only images)
const fileFilter = (
  req: Request,
  file: MulterFile, // use imported type from multer
  cb: FileFilterCallback
) => {
  if (file.mimetype && file.mimetype.startsWith("imageUser/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};
const upload = multer({ storage, fileFilter });
export default upload;
