const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");

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

    return res.status(200).json({ log: "แก้ไขรหัสผ่านเสร็จสิ้น" });
  } catch (err) {
    return res.status(500).json({ log: "เซิฟเวอร์ขัดข้อง" });
  }
};
