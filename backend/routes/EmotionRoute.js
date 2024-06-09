const express = require("express");
const router = express.Router();

const {
  getColors,
  getColorByID,
  getColorsByID,
} = require("../controllers/emotion");

router.get("/getColors", getColors);

router.post("/getColorByID", getColorByID);

router.post("/getColorsByID", getColorsByID);

module.exports = router;
