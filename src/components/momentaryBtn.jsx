import React from "react";
import reccircle from "../assets/reccircle.png";
import uparrow from "../assets/uparrow.png";
import { NavLink } from "react-router-dom";
export function MomentaryBtn() {
  return (
    <>
      <NavLink to="/momentary">
        <div className="absolute rounded-full bg-white/80 p-1 border-2 border-white  cursor-pointer ml-10 ">
          <div className="flex place-content-center place-items-center  ">
            <img src={uparrow} alt="" className="w-7 absolute shake z-10" />
            <img
              src={reccircle}
              alt=""
              className="w-16 transition delay-900 animate-spin-slow"
            />
          </div>
        </div>
      </NavLink>
    </>
  );
}
