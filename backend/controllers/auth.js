const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFromUserName = await UserModel.findOne({ username: username });
    const userFromEmail = await UserModel.findOne({ email: email });

    if (userFromUserName) {
      return res.status(400).json({ log: "username ถูกใช้ไปแล้ว" });
    }
    if (userFromEmail) {
      return res.status(400).json({ log: "อีเมลถูกใช้ไปแล้ว" });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username,
      email,
      password: encryptedPassword,
    });

    return res.status(201).json({ log: "สมัครสมาชิกสำเร็จ" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ log: "เซิฟเวอร์ขัดข้อง" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(403).json({ log: "รหัสผ่านไม่ถูกต้อง" });
      }

      const payload = {
        user: {
          email: user.email,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token: token, payload: payload });
        }
      );
    } else {
      return res.status(404).json({ log: "ไม่พบบัญชีผู้ใช้" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ log: "เซิฟเวอร์ขัดข้อง" });
  }
};
