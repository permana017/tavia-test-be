import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/files");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const importFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let formatType = path.extname(file.originalname);
    if (formatType == ".csv" || formatType == ".xls" || formatType == ".xlsx") {
      cb(null, true);
    } else {
      cb(
        "File upload only supports the following filetypes - csv|xls|xlsx",
        false
      );
    }
  },
});

export default importFile;
