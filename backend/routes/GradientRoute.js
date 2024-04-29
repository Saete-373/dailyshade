const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const EmotionRecordModel = require("../models/EmotionRecord");

router.use(cookieParser());

router.post("/getUserRecord", async (req, res) => {
  const { user_id } = req.body;
  const value = new mongoose.Types.ObjectId(user_id);
  console.log(value);
  try {
    const records = await EmotionRecordModel.find({
      user_id: value,
    });
    // console.log(records);
    return res.status(200).json(records);
  } catch (err) {
    return res.status(404).json({ log: "ยังไม่มีการบันทึกในระบบ" });
  }
});

module.exports = router;
