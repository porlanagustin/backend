import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "upload");
},
    filename: (req, file, cb) => {
    cb(null, file.originalname);
},
});

const upload = multer({ storage });

export default upload;