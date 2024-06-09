const express = require("express");
const router = express.Router();

const { getUser, getUserData } = require("../controllers/user");

const { auth } = require("../middleware/auth");

router.get("/getUser", getUser);

router.post("/getUserData", getUserData);

module.exports = router;
