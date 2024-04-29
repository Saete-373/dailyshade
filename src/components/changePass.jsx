import React from "react";
import Recordbtn from "./button";
import png from "../assets/3.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function ChangePassword() {
  return (
    <>
      <h2 className="pt-12 text-xl pl-10 text-left">เปลี่ยนรหัสผ่าน</h2>
      <form>
        <div className="flex max-w-full justify-start place-content-center gap-10 p-10">
          <div className="w-3/5">
            <div className="flex flex-col pb-2">
              <label className="text-left">รหัสผ่านปัจจุบัน</label>
              <input
                type="password"
                className="rounded-xl p-2 bg-transparent border-2 border-white w-full placeholder-black-400"
              />
            </div>
            <div className="text-right underline pb-4">
              <NavLink to="/forgetpw">ลืมรหัสผ่าน?</NavLink>
            </div>
            <div className="flex flex-col pb-4">
              <label className="text-left">รหัสผ่านใหม่</label>

              <input
                type="text"
                className="rounded-xl p-2 bg-transparent border-2 border-white w-full"
              />
            </div>
            <div className="flex flex-col pb-2">
              <label className="text-left">ยืนยันรหัสผ่าน</label>

              <input
                type="text"
                className="rounded-xl p-2 bg-transparent border-2 border-white w-full"
              />
            </div>
          </div>
        </div>
        <div className=" w-3/5 p-10">
          <Recordbtn />
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
