const express = require("express");
const router = express.Router();

const { getUser, getUserData } = require("../controllers/user");

const { auth } = require("../middleware/auth");

router.post("/getUser", auth, getUser);

router.post("/getUserData", auth, getUserData);

module.exports = router;
