import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios";
import Recordbtn from "./button";
import png from "../assets/3.png";

const getUser = (state) => ({ ...state.user });

function ChangePassword() {
  const user = useSelector(getUser);
  const [userData, seUserData] = useState({
    email: user.email,
    oldPass: "",
    newPass: "",
    confPass: "",
  });

  const updatePass = async () => {
    await api
      .put(
        "/updatePass",
        {
          email: userData.email,
          oldPass: userData.oldPass,
          newPass: userData.newPass,
          confPass: userData.confPass,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.log);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.log);
      });
  };

  useEffect(() => {
    seUserData((prev) => ({ ...prev, email: user.email }));
  }, [user.email]);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  const handleChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;

    seUserData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updatePass();
  };

  return (
    <>
      <h2 className="pt-12 text-xl pl-10 text-left">เปลี่ยนรหัสผ่าน</h2>
      <form>
        <div className="flex flex-col max-w-full justify-start place-content-center gap-10 p-10">
          <div className="w-3/5">
            <div className="flex flex-col pb-2">
              <label className="text-left">รหัสผ่านเก่า</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-800  rounded-s-3xl bg-gray-200">
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
                  name="oldPass"
                  className="rounded-e-3xl p-3 bg-gray-200 w-full focus:outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="text-right hover:underline underline-offset-4 pb-4">
              <NavLink to="/forgetpw">ลืมรหัสผ่าน</NavLink>
            </div>
            <div className="flex flex-col pb-2">
              <label className="text-left">รหัสผ่านใหม่</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-800  rounded-s-3xl bg-gray-200">
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
                  name="newPass"
                  className="rounded-e-3xl p-3 bg-gray-200 w-full focus:outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col pb-2">
              <label className="text-left">ยืนยันรหัสผ่าน</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-800  rounded-s-3xl bg-gray-200">
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
                  name="confPass"
                  className="rounded-e-3xl p-3 bg-gray-200 w-full focus:outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className=" w-3/5">
            <button
              type="submit"
              className="z-99 inline-flex items-center justify-center rounded-3xl bg-base-pink w-full py-3 text-sm  text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker cursor-pointer"
              onClick={handleSubmit}
            >
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
