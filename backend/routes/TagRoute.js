const express = require("express");
const router = express.Router();

const { getTags, getTagsByColor } = require("../controllers/tag");

router.get("/getTags", getTags);

router.post("/getTagsByColor", getTagsByColor);

module.exports = router;
