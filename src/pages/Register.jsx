import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import png from "../assets/regis.png";
import "./bg.css";

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
          navigate("/auth");
        })
        .catch((err) => {
          console.log(err.response.data.log);
          setLog(err.response.data.log);
        });
    }
  };

  return (
    <div className=" flex place-items-center border-2 border-white-100 rounded-xl gap-5 bg-white/20 backdrop-blur-md ">
      <div className="max-w-full w-4/12 p-14 md:w-full min-w-fit">
        <form onSubmit={handleSubmit}>
          <h1 className="uppercase pb-5 text-2xl">สร้างบัญชี</h1>
          <div className="flex flex-col pb-2">
            <label className="text-left">ชื่อผู้ใช้</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 rounded-s-3xl bg-white/40">
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
                className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none"
                name="username"
                onChange={OnChange}
              />
            </div>
          </div>
          <div className="flex flex-col pb-2 ">
            <label className="text-left">อีเมล</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-800 rounded-s-3xl bg-white/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none peer"
                onChange={OnChange}
              />
            </div>
          </div>
          <div className="flex flex-col pb-2">
            <label className="text-left">รหัสผ่าน</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-800  rounded-s-3xl bg-white/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="password"
                name="password"
                className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none"
                onChange={OnChange}
              />
            </div>
          </div>
          <div className="flex flex-col pb-4 ">
            <label className="text-left">ยืนยันรหัสผ่าน</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-800 rounded-s-3xl bg-white/40">
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </span>
              <input
                type="password"
                name="cpassword"
                className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none"
                onChange={OnChange}
              />
            </div>
          </div>
          <div className="flex flex-col pb-4">
            <span className="inline-flex items-center px-3 text-sm text-red-600 ">
              {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg> */}
              <p className="text-sm text-left pl-1 text-red-600">{log}</p>
            </span>
          </div>

          <button
            type="submit"
            className="uppercase inline-flex items-center justify-center rounded-3xl bg-base-pink  w-full py-4 text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker mt-2"
          >
            สร้างบัญชี
          </button>
          <div className="pt-5">
            มีบัญชีอยู่แล้ว?
            <span
              className=" pl-5 hover:underline underline-offset-4 cursor-pointer"
              id="flipButtonBack"
            >
              เข้าสู่ระบบ
            </span>
          </div>
        </form>
      </div>
      <div className="max-w-full w-8/12 hidden lg:flex">
        <img src={png} className="rounded-r-xl "></img>
      </div>
    </div>
  );
}

export default Register;
