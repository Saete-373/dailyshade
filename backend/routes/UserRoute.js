const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("../models/User");

router.use(cookieParser());

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const userFromUserName = await UserModel.findOne({ username: username });
    const userFromEmail = await UserModel.findOne({ email: email });
    if (userFromUserName || userFromEmail) {
      return res.status(400).send("already exist");
    } else {
      await UserModel.create({
        username,
        email,
        password: encryptedPassword,
      });
      return res.status(201).send("User Created");
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACC_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REF_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      return res.status(200).send("Login Success!");
    } else {
      return res.status(404).send("User Not Found");
    }
  } catch (err) {
    return res.status(404).send("User Not Found");
  }
});

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACC_SECRET, (err, decoded) => {
      if (err) return res.status(403).send("Forbidden");
      req.email = decoded.email;
      next();
    });
  } else {
    if (renewToken(req, res)) {
      next();
    }
  }
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let exist = false;
  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REF_SECRET, (err, decoded) => {
      if (err) return res.status(403).send("Forbidden");
      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.ACC_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken);
      exist = true;
      next();
    });
  } else {
    return res.send("No Refresh token");
  }
  return exist;
};

router.get("/getUser", verifyUser, (req, res) => {
  const data = req.email;
  return res.json(data);
});

module.exports = router;
