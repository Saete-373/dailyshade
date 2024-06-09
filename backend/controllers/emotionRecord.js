const mongoose = require("mongoose");
const UserModel = require("../models/User");
const EmotionRecordModel = require("../models/EmotionRecord");

exports.getUserRecord = async (req, res) => {
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
};

exports.addRecord = async (req, res) => {
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
};

exports.deleteRecord = async (req, res) => {
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
};
