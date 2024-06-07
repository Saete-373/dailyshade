const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("../models/User");
const EmotionModel = require("../models/Emotion");
const EmotionRecordModel = require("../models/EmotionRecord");
const TagModel = require("../models/Tag");

router.use(cookieParser());

router.post("/getUserRecord", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    const records = await EmotionRecordModel.find({
      user_id: user._id,
    });
    return res.status(200).json(records);
  } catch (err) {
    return res.status(404).json({ log: "ยังไม่มีการบันทึกในระบบ" });
  }
});

router.post("/getColorsByID", async (req, res) => {
  const { color_ids } = req.body;

  try {
    let color_list = [];
    for (let i = 0; i < color_ids.length; i++) {
      const color_id = new mongoose.Types.ObjectId(color_ids[i]);
      const color = await EmotionModel.findOne({
        _id: color_id,
      });
      color_list.push(color.color);
    }
    return res.status(200).json(color_list);
  } catch (err) {
    return res.status(404).json({ log: "ยังไม่มีการบันทึกในระบบ" });
  }
});

router.post("/getColorByID", async (req, res) => {
  const { color_id } = req.body;

  try {
    const color_id_obj = new mongoose.Types.ObjectId(color_id);
    const color = await EmotionModel.findOne({
      _id: color_id_obj,
    });

    return res.status(200).json({ emotion: color });
  } catch (err) {
    return res.status(404).json({ log: "ยังไม่มีการบันทึกในระบบ" });
  }
});

router.get("/getColors", async (req, res) => {
  try {
    const colors = await EmotionModel.find({});
    return res.status(200).json(colors);
  } catch (err) {
    return res.status(404).json({ log: "ไม่มีสีในระบบ" });
  }
});

router.get("/getTags", async (req, res) => {
  try {
    const tags = await TagModel.find({});
    return res.status(200).json(tags);
  } catch (err) {
    return res.status(404).json({ log: "ไม่มีสีในระบบ" });
  }
});

router.post("/getTagsByColor", async (req, res) => {
  const { selected_color } = req.body;

  try {
    const color = await EmotionModel.findOne({ color: selected_color });
    const tags = await TagModel.find({
      color_id: color._id,
    });
    return res.status(200).json(tags);
  } catch (err) {
    return res.status(404).json({ log: "ยังไม่มีการบันทึกในระบบ" });
  }
});

router.post("/addRecord", async (req, res) => {
  const { email, color_id, tag_ids, datetime } = req.body;

  const color_id_obj = new mongoose.Types.ObjectId(color_id);
  const tag_ids_obj = tag_ids.map((tag) => new mongoose.Types.ObjectId(tag));
  const conv_datetime = new Date(datetime).toLocaleString("en", {
    timeZone: "Asia/Jakarta",
  });
  const final_datetime = new Date(conv_datetime);

  try {
    const user = await UserModel.findOne({ email: email });
    const record = new EmotionRecordModel({
      user_id: user._id,
      color_id: color_id_obj,
      tags: tag_ids_obj,
      datetime: final_datetime,
    });
    await record.save();

    return res.status(200).json({
      log: "บันทึกข้อมูลสำเร็จ",
      newRecord: record,
    });
  } catch (err) {
    return res.status(500).json({
      log: "ไม่สามารถบันทึกได้",
      error: err.message,
    });
  }
});

router.post("/deleteRecord", async (req, res) => {
  const { rec_id } = req.body;
  const record_id = new mongoose.Types.ObjectId(rec_id);

  try {
    const deletedEmotion = await EmotionRecordModel.deleteOne({
      _id: record_id,
    });
    console.log("Deleted emotion count:", deletedEmotion.deletedCount);
    if (deletedEmotion.deletedCount === 1)
      return res.status(200).json({ log: "ลบบันทึกอารมณ์เสร็จสิ้น" });
    else {
      return res.status(403).json({ log: "ข้อมูลไม่ถูกต้อง" });
    }
  } catch (error) {
    console.error("Error deleting emotion:", error);
  }
});

module.exports = router;
