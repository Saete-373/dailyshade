const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
});

const QuoteModel = mongoose.model("quote", QuoteSchema);
module.exports = QuoteModel;
