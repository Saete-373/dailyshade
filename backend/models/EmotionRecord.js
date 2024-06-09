const mongoose = require("mongoose");

const EmotionRecordSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  datetime: {
    type: Date,
    
    min: "2000-01-01",
    max: "2040-01-01",
  },
  color_id: { type: mongoose.Schema.Types.ObjectId, ref: "emotion" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
  note: {type:String},
});

const EmotionRecordModel = mongoose.model("emo_rec", EmotionRecordSchema);
module.exports = EmotionRecordModel;
