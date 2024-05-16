import { useState, useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import "./bg.css";
function FogetPW() {
  return (
    <div
      className="flex justify-center max-x-screen  max-h-full h-screen place-items-center"
      id="css-selector-fgw"
    >
      <div className="flex place-items-center w-8/12 max-h-screen h-4/5 border-2 border-black-50 rounded-xl gap-5 bg-white/20 backdrop-blur-md">
        <div className="p-20 md:w-full">
          <form>
            <div className="flex flex-col place-items-center">
              <h1 className="pb-5 text-2xl">ลืมรหัสผ่าน</h1>
              <h1 className="pb-5 text-xl">
                เราจะส่งรหัสผ่านไปตามที่อยู่อีเมลของท่าน
              </h1>
              <div className="flex flex-col pb-2  w-3/6">
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
                    className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none "
                  />
                </div>
              </div>

              <button
                type="submit"
                className="uppercase inline-flex items-center justify-center rounded-3xl bg-base-pink  w-3/6 py-4 text-sm  text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker mt-2"
              >
                ยืนยัน
              </button>
            </div>
          </form>
        </div>
        {/* <div className="max-w-full w-8/12 hidden lg:flex">
          <img src={png} className="rounded-r-xl "></img>
        </div> */}
      </div>
    </div>
  );
}

export default FogetPW;
