const express = require("express");
const router = express.Router();

const { getQuote } = require("../controllers/quote");

router.get("/getQuote", getQuote);

module.exports = router;
