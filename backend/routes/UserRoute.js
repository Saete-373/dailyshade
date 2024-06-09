const express = require("express");
const router = express.Router();

const {
  getUserData,
  updatePass,
  updateProfile,
  uploadProfile,
} = require("../controllers/user");

const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploadImage");

router.post("/getUserData", getUserData);

router.put("/updateProfile", auth, updateProfile);

router.post("/uploadProfile", upload.single("image"), uploadProfile);

router.put("/updatePass", auth, updatePass);

module.exports = router;
