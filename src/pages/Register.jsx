import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [regisUser, setRegisUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [log, setLog] = useState("");
  const navigate = useNavigate();

  const OnChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;

    setRegisUser((oldData) => ({ ...oldData, [key]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      !regisUser.username ||
      !regisUser.email ||
      !regisUser.password ||
      !regisUser.cpassword
    ) {
      setLog("โปรดกรอกข้อมูลให้ครบถ้วน");
    } else if (
      regisUser.password.length < 8 ||
      regisUser.password.length > 20 ||
      regisUser.cpassword.length < 8 ||
      regisUser.cpassword.length > 20
    ) {
      setLog("โปรดกรอกรหัสผ่าน 8-20 ตัวอักษร");
    } else if (regisUser.password != regisUser.cpassword) {
      setLog("รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่");
    } else {
      axios
        .post("http://localhost:5000/api/register", {
          username: regisUser.username,
          email: regisUser.email,
          password: regisUser.password,
        })
        .then((res) => {
          console.log(res.data.log);
          setLog(res.data.log);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.data.log);
          setLog(err.response.data.log);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>register</h1>
      <div>
        Username <br />
        <input type="text" name="username" onChange={OnChange} />
      </div>
      <div>
        Email <br />
        <input type="email" name="email" onChange={OnChange} />
      </div>
      <div>
        Password <br />
        <input type="password" name="password" onChange={OnChange} />
      </div>
      <div>
        Confirm Password <br />
        <input type="password" name="cpassword" onChange={OnChange} />
      </div>
      <div>
        <label style={{ color: "red" }}>{log}</label>
      </div>
      <button type="submit" className="w-36 h-auto bg-white">
        Register
      </button>
    </form>
  );
}

export default Register;
