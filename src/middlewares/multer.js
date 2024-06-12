import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryUpload from "../utils/cloudinary.js";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: "tavia",
    format: async (req, file) => "png",
    public_id: (req, file) => new Date().getTime(),
  },
});

const fileFilter = (req, file, cb) => {
  let formatType = path.extname(file.originalname);
  if (
    formatType == ".png" ||
    formatType == ".jpg" ||
    formatType == ".jpeg" ||
    formatType == ".webp"
  ) {
    cb(null, true);
  } else {
    cb("image not valid", false);
  }
};

const formUploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1048576 * 10, //10 mb
  },
});
const formUploadCloud = multer({
  storage: storageCloudinary,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1048576 * 10, //10 mb
  },
});

export { formUploadImage, formUploadCloud };
