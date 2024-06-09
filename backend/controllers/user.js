const UserModel = require("../models/User");

exports.getUser = async (req, res) => {
  // try {
  //   const data = req.user.email;
  //   return res.json({ email: data, log: "พบบัญชีผู้ใช้", isLogin: true });
  // } catch (err) {}
};

exports.getUserData = async (req, res) => {
  const { email } = req.body;
  try {
    const user_data = await UserModel.findOne({ email: email });
    return res.status(200).json(user_data);
  } catch (err) {
    return res.status(404).json({ log: "ไม่พบผู้ใช้นี้ในระบบ" });
  }
};
