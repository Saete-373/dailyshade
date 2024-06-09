const EmotionModel = require("../models/Emotion");
const TagModel = require("../models/Tag");

exports.getTags = async (req, res) => {
  try {
    const tags = await TagModel.find({});
    return res.status(200).json(tags);
  } catch (err) {
    return res.status(404).json({ log: "ไม่มีสีในระบบ" });
  }
};

exports.getTagsByColor = async (req, res) => {
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
};
