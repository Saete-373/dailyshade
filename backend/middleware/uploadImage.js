const multer = require("multer");
const path = require("path");
const dayjs = require("dayjs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../frontend/public/imageGalleries");
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = dayjs().format("YYYY_MM_DD_HH_mm_ss");
    cb(null, uniquePrefix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { storage, upload };
