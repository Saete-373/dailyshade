import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { EmailContext } from "../App";
import png from "../assets/login.png";
import "./bg.css";

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [log, setLog] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const OnChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;

    // setLoginUser({});
    setLoginUser((oldData) => ({ ...oldData, [key]: value }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:5000/user/login", {
        email: loginUser.email,
        password: loginUser.password,
      })
      .then((res) => {
        console.log(res.data.log);
        setLog(res.data.log);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.log);
        setLog(err.response.data.log);
      });
  };
  return (
    <div
      className="flex justify-center max-x-screen max-h-full h-screen place-items-center"
      id="css-selector"
    >
      <div className="flex place-items-center max-w-4xl max-h-screen h-4/5 border-2 border-white-100 rounded-xl gap-5 bg-white/20 backdrop-blur-md">
        <div className="max-w-full w-8/12 hidden lg:flex h- rounded-l-xl">
          <img src={png} className=" w-fit h-fit"></img>
        </div>
        <div className="max-w-full w-4/12 p-10 md:w-full min-w-fit">
          <form onSubmit={handleSubmit}>
            <h1 className=" pb-5 text-2xl">เข้าสู่ระบบ</h1>
            <p>{log}</p>
            <div className="flex flex-col pb-2">
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
                  className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none"
                  type="email"
                  name="email"
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
                  className="rounded-e-3xl p-3  bg-white/40 w-full focus:outline-none"
                  type="password"
                  name="password"
                  onChange={OnChange}
                />
              </div>
            </div>
            <div className="text-right underline pb-4">
              <NavLink to="/forgetpw">ลืมรหัสผ่าน?</NavLink>
            </div>
            <button
              type="submit"
              className="uppercase inline-flex items-center justify-center rounded-3xl bg-base-pink  w-full py-4 text-sm  text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker "
            >
              เข้าสู่ระบบ
            </button>

            <div className="pt-5">
              ยังไม่มีบัญชี?
              <NavLink to="/register">
                <span className=" pl-5 underline">สร้างบัญชี</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
