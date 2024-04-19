const mongoose = require("mongoose");
const EmotionModel = require("./Emotion");

const TagSchema = new mongoose.Schema({
  tag: String,
  color_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "emotion" }],
});

const TagModel = mongoose.model("tag", TagSchema);
module.exports = TagModel;
