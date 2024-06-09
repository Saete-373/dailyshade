const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const sendEmail = require("../sendEmail");
const jwt = require("jsonwebtoken");

exports.getUserData = async (req, res) => {
  const { email } = req.body;
  try {
    const user_data = await UserModel.findOne({ email: email });
    return res.status(200).json(user_data);
  } catch (err) {
    return res.status(404).json({ log: "ไม่พบผู้ใช้นี้ในระบบ" });
  }
};

exports.updatePass = async (req, res) => {
  try {
    const { email, oldPass, newPass, confPass } = req.body;
    const auth_email = req.user.email;

    if (email != auth_email) {
      return res.status(403).json({ log: "บัญชีผู้ใช้ไม่ถูกต้อง" });
    }

    const exist_user = await UserModel.findOne({ email: email });

    if (!exist_user) {
      return res.status(404).json({ log: "ไม่พบผู้ใช้นี้ในระบบ" });
    }

    const checkOldPass = await bcrypt.compare(oldPass, exist_user.password);

    if (!checkOldPass) {
      return res.status(403).json({ log: "รหัสผ่านเก่าผิด" });
    }

    if (newPass != confPass) {
      return res.status(403).json({ log: "รหัสผ่านไม่ตรงกัน" });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPass, salt);

    const updateUser = await UserModel.findOneAndUpdate(
      { email: email },
      { password: encryptedPassword }
    );
    if (updateUser)
      return res.status(200).json({ log: "แก้ไขรหัสผ่านเสร็จสิ้น" });
  } catch (err) {
    return res.status(500).json({ log: "เซิฟเวอร์ขัดข้อง" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, user_pic } = req.body;
    const auth_email = req.user.email;

    const exist_user = await UserModel.findOne({ email: auth_email });

    if (!exist_user) {
      return res.status(404).json({ log: "ไม่พบผู้ใช้นี้ในระบบ" });
    }

    const userFromUserName = await UserModel.findOne({ username: username });

    if (userFromUserName) {
      return res.status(400).json({ log: "username ถูกใช้ไปแล้ว" });
    }

    const updateUser = await UserModel.findOneAndUpdate(
      { email: auth_email },
      { username: username, user_pic: user_pic }
    );

    if (updateUser)
      return res.status(200).json({ log: "แก้ไขโปรไฟล์เสร็จสิ้น" });
  } catch (err) {
    return res.status(500).json({ log: "เซิฟเวอร์ขัดข้อง" });
  }
};

exports.uploadProfile = async (req, res) => {
  try {
    const imageName = req.file.filename;

    return res.status(200).json({ log: "test", imageName: imageName });
  } catch (err) {
    return res.status(500).json({ log: "เซิฟเวอร์ขัดข้อง" });
  }
};

exports.forgetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ log: "ไม่พบบัญชีผู้ใช้" });
    }

    const payload = {
      user: {
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: "10m" },
      async (err, token) => {
        if (err) {
          return res
            .status(500)
            .json({ log: "เกิดข้อผิดพลาดในการสร้างโทเค็น" });
        }

        const emailContent = `<h3>รีเซ็ตรหัสผ่าน</h3>
        <p>คุณได้ส่งคำขอเพื่อรีเซ็ตรหัสผ่านของคุณ โปรดคลิกลิงก์ด้านล่างเพื่อดำเนินการต่อ</p>
        <a href="http://localhost:5173/resetpassword/${token}">http://localhost:5173/resetpassword/${token}</a>
        <p>ลิงก์นี้จะหมดอายุภายใน 10 นาที</p>
       `;
        try {
          await sendEmail(email, "รีเซ็ตรหัสผ่าน", emailContent);
          return res.status(200).json({ log: "ส่งอีเมลสำเร็จ" });
        } catch (emailError) {
          return res.status(500).json({ log: "เกิดข้อผิดพลาดในการส่งอีเมล" });
        }
      }
    );
  } catch (err) {
    return res
      .status(500)
      .json({ log: "เกิดข้อผิดพลาดในการค้นหาผู้ใช้", error: err.message });
  }
};

exports.resetPass = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.params.token, process.env.SECRET);
    if (!decodedToken) {
      return res.status(401).send({ log: "ไม่พบโทเค็น" });
    }
    const { newPass, confPass } = req.body;
    const user = await UserModel.findOne({ email: decodedToken.user.email });

    if (!user) {
      return res.status(401).send({ log: "ไม่พบผู้ใช้นี้ในระบบ" });
    }
    if (newPass !== confPass) {
      return res.status(403).json({ log: "รหัสผ่านไม่ตรงกัน" });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPass, salt);

    user.password = encryptedPassword;
    await user.save();

    return res.status(200).json({ log: "แก้ไขรหัสผ่านเสร็จสิ้น" });
  } catch (err) {
    return res.status(500).json({ log: "เซิฟเวอร์ขัดข้อง" });
  }
};
