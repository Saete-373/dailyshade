const express = require("express");
const router = express.Router();

const { getUserData, updatePass } = require("../controllers/user");

const { auth } = require("../middleware/auth");

router.post("/getUserData", getUserData);

router.put("/updatePass", auth, updatePass);

module.exports = router;
