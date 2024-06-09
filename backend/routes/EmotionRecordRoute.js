const express = require("express");
const router = express.Router();

const {
  getUserRecord,
  addRecord,
  deleteRecord,
} = require("../controllers/emotionRecord");

router.post("/getUserRecord", getUserRecord);

router.post("/addRecord", addRecord);

router.post("/deleteRecord", deleteRecord);

module.exports = router;
