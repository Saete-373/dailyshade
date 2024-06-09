const QuoteModel = require("../models/Quote");

exports.getQuote = async (req, res) => {
  try {
    const quotes = await QuoteModel.find({});
    return res.status(200).json({ quotes: quotes });
  } catch (err) {
    return res.status(404).json({ log: "ไม่มีสีในระบบ" });
  }
};
