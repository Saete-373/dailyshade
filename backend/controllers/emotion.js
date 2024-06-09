const mongoose = require("mongoose");
const EmotionModel = require("../models/Emotion");

exports.getColors = async (req, res) => {
  try {
    const colors = await EmotionModel.find({});
    return res.status(200).json(colors);
  } catch (err) {
    return res.status(404).json({ log: "ไม่มีสีในระบบ" });
  }
};

exports.getColorByID = async (req, res) => {
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
};

exports.getColorsByID = async (req, res) => {
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
};
