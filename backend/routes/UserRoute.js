const express = require("express");
const router = express.Router();

const {
  getUserData,
  updatePass,
  updateProfile,
  uploadProfile,
  forgetPass,
  resetPass,
} = require("../controllers/user");

const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploadImage");

router.post("/getUserData", getUserData);

router.put("/updateProfile", auth, updateProfile);

router.post("/uploadProfile", upload.single("image"), uploadProfile);

router.put("/updatePass", auth, updatePass);

router.post("/forgetPass", forgetPass);

router.put('/resetPass/:token', resetPass);

module.exports = router;
