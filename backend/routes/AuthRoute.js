const express = require("express");
const router = express.Router();

const {
  register,
  login,
  currentUser,
  //   listUser,
  //   editUser,
  //   deleteUser,
  //   currentUser,
} = require("../controllers/auth");

const { auth } = require("../middleware/auth");

router.post("/register", register);

router.post("/login", login);

router.post("/currentUser", auth, currentUser);

//@Endpoint  http://localhost:3000/api/current-user
//@Method    POST
//@Access    Private
// router.post("/current-user", auth, currentUser);

//@Endpoint  http://localhost:3000/api/current-admin
//@Method    POST
//@Access    Private
// router.post("/current-admin", auth, adminCheck, currentUser);

//@Endpoint  http://localhost:3000/api/auth
//@Method    GET
//@Access    Publish
// router.get("/auth", listUser);

//@Endpoint   http://localhost:3000/api/auth
//@Method    PUT
//@Access    Publish
// router.put("/auth", editUser);

//@Endpoint   http://localhost:3000/api/auth
//@Method    DELETE
//@Access    Publish
// router.delete("/auth", deleteUser);

module.exports = router;
