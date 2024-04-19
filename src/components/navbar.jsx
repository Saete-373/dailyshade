import React from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import png from "../assets/3.png";

function StickyNavbar() {
  return (
    <>
      <header className="relative inset-x-0 top-0 z-30 mx-auto border border-white bg-white/80 py-3 shadow backdrop-blur-lg max-w-full">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <NavLink aria-current="page" className="flex items-center" to="/">
                <img className="h-7 w-auto" src={png} alt="" />
                <p className="inline-block rounded-lg px-6 py-1 text-sm font-medium text-text-color transition-all duration-200 ">
                  DailyShade
                </p>
              </NavLink>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              <NavLink
                aria-current="page"
                className="group inline-block lg px-6 py-1 font-medium text-text-color"
                to="/"
              >
                หน้าหลัก
                <div className="bg-base-pink h-[2px] w-0 group-hover:w-full transition-all duration-500 "></div>
              </NavLink>

              <NavLink
                className="group inline-block lg px-6 py-1 font-medium text-text-color"
                to="/"
              >
                ปฏิทิน
                <div className="bg-base-pink h-[2px] w-0 group-hover:w-full transition-all duration-500 "></div>
              </NavLink>
              <NavLink
                className="group inline-block lg px-6 py-1 font-medium text-text-color"
                to="/"
              >
                ความรู้สึก
                <div className="bg-base-pink h-[2px] w-0 group-hover:w-full transition-all duration-500 "></div>
              </NavLink>
            </div>
            <div className="flex items-center justify-end gap-4">
              {/* <NavLink class=" items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-text-color shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-pink-darker sm:inline-flex"
                            to="/login">Sign in</NavLink>
                        <NavLink class="inline-flex items-center justify-center rounded-full bg-base-pink px-3 py-2 text-sm font-semibold text-text-color shadow-sm transition-all duration-150 hover:bg-pink-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            to="/login">Login</NavLink> */}
              <p className="inline-block rounded-lg px-6 py-1 text-sm font-medium text-white transition-all duration-200 ">
                DailyShade
              </p>
              <img
                className="h-7 w-auto inline-block rounded-full hover:ring-2"
                src={png}
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default StickyNavbar;
