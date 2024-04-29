const mongoose = require("mongoose");

const EmotionRecordSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: Number,
  month: Number,
  year: Number,
  hour: Number,
  minute: Number,
  color_id: { type: mongoose.Schema.Types.ObjectId, ref: "emotion" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
});

const EmotionRecordModel = mongoose.model("emo_rec", EmotionRecordSchema);
module.exports = EmotionRecordModel;
