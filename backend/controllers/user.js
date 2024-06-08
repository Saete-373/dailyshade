const UserModel = require("../models/User");

exports.getUser = async (req, res) => {
  const data = req.email;
  return res.json({ email: data, log: "พบบัญชีผู้ใช้", isLogin: true });
};

exports.getUserData = async (req, res) => {
  const { email } = req.body;
  const emailFromCookie = req.email;
  try {
    if (email == emailFromCookie) {
      const user_data = await UserModel.findOne({ email: email });
      return res.status(200).json(user_data);
    }
  } catch (err) {
    return res.status(404).json({ log: "ไม่พบผู้ใช้นี้ในระบบ" });
  }
};
