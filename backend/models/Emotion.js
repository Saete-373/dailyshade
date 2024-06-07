const mongoose = require("mongoose");

const EmotionSchema = new mongoose.Schema({
  color: String,
  color_name: String,
  emo_pic: String,
});

const EmotionModel = mongoose.model("emotion", EmotionSchema);
module.exports = EmotionModel;
