import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import png from "../assets/3.png";

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
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
      .post("http://localhost:5000/api/login", {
        email: loginUser.email,
        password: loginUser.password,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center max-x-screen max-h-full h-screen place-items-center">
      <div className="flex place-items-center max-w-4xl max-h-screen h-4/5 border-2 border-black-50 rounded-xl gap-5 ">
        <div className="max-w-full w-7/12 hidden lg:flex">
          <img src={png} className="rounded-r-xl "></img>
        </div>
        <div className="max-w-full w-7/12 p-14 md:w-full min-w-fit">
          <form onSubmit={handleSubmit}>
            <h1 className=" pb-5 text-2xl">เข้าสู่ระบบ</h1>
            <div className="flex flex-col pb-2">
              <label className="text-left">อีเมล</label>
              <input
                className="rounded-xl p-2 bg-transparent border-2 border-white"
                type="email"
                name="email"
                onChange={OnChange}
              />
            </div>
            <div className="flex flex-col pb-2">
              <label className="text-left">รหัสผ่าน</label>
              <input
                className="rounded-xl p-2 bg-transparent border-2 border-white"
                type="password"
                name="password"
                onChange={OnChange}
              />
            </div>
            <div className="text-right underline pb-4">
              <NavLink to="/forgetpw">ลืมรหัสผ่าน?</NavLink>
            </div>
            <button
              type="submit"
              className="uppercase inline-flex items-center justify-center rounded-xl bg-base-pink  w-full py-3 text-sm  text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker "
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
