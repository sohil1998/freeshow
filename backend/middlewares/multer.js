import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage }).single("cover_photo");

export default upload;
