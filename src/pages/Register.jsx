import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import png from "../assets/3.png";

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
        .post("http://localhost:5000/user/register", {
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
    <div className="flex justify-center max-x-screen max-h-full h-screen place-items-center">
      <div className="flex place-items-center max-w-4xl max-h-screen h-4/5 border-2 border-black-50 rounded-xl gap-5 ">
        <div className="max-w-full w-7/12 p-14 md:w-full min-w-fit">
          <form onSubmit={handleSubmit}>
            <h1 className="uppercase pb-5 text-2xl">สร้างบัญชี</h1>
            <p>{log}</p>
            <div className="flex flex-col pb-2">
              <label className="text-left">ชื่อผู้ใช้</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 border-2 rounded-s-xl border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="rounded-e-xl p-2 bg-transparent border-2 border-white w-full"
                  name="username"
                  onChange={OnChange}
                />
              </div>
            </div>
            <div className="flex flex-col pb-2">
              <label className="text-left">อีเมล</label>
              <input
                type="email"
                name="email"
                className="rounded-xl p-2 bg-transparent border-2 border-white peer"
                onChange={OnChange}
              />
              <p className="mt-2 hidden peer-invalid:contents text-pink-600 text-sm text-left">
                Please provide a valid email address.
              </p>
            </div>
            <div className="flex flex-col pb-2">
              <label className="text-left">สร้างรหัสผ่าน</label>
              <input
                type="password"
                name="password"
                className="rounded-xl p-2 bg-transparent border-2 border-white"
                onChange={OnChange}
              />
            </div>
            <div className="flex flex-col pb-4 ">
              <label className="text-left">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name="cpassword"
                className="rounded-xl p-2 bg-transparent border-2 border-white"
                onChange={OnChange}
              />
            </div>
            <button
              type="submit"
              className="uppercase inline-flex items-center justify-center rounded-xl bg-base-pink  w-full py-3 text-sm  text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker "
            >
              สร้างบัญชี
            </button>
            <div className="pt-5">
              มีบัญชีอยู่แล้ว?
              <NavLink to="/login">
                <span className=" pl-5 underline">เข้าสู่ระบบ</span>
              </NavLink>
            </div>
          </form>
        </div>
        <div className="max-w-full w-7/12 hidden lg:flex">
          <img src={png} className="rounded-r-xl "></img>
        </div>
      </div>
    </div>
  );
}

export default Register;
