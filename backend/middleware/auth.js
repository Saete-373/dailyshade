const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    console.log("token checking", token);
    if (!token) {
      return res
        .status(401)
        .json({ log: "ไม่พบ token, การยืนยันตัวตนถูกปฏิเสธ" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ log: "token ไม่ถูกต้อง" });
  }
};
