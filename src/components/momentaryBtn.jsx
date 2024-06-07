import React from "react";
import reccircle from "../assets/reccircle.png";
import uparrow from "../assets/uparrow.png";
import { NavLink, useNavigate } from "react-router-dom";

export function MomentaryBtn({ selectDate }) {
  return (
    <>
      <button
        type="button"
        className="absolute rounded-full bg-white/80 p-1 border-2 border-white  cursor-pointer ml-10 "
        onClick={() => {
          const select_date = selectDate;
          if (window.localStorage.getItem("selectDate")) {
            window.localStorage.removeItem("selectDate");
            window.localStorage.setItem(
              "selectDate",
              JSON.stringify(select_date)
            );
          } else {
            window.localStorage.setItem(
              "selectDate",
              JSON.stringify(select_date)
            );
          }
          window.location.href = "http://localhost:5173/momentary";
        }}
      >
        <div className="flex place-content-center place-items-center  ">
          <img src={uparrow} alt="" className="w-7 absolute shake z-10" />
          <img
            src={reccircle}
            alt=""
            className="w-16 transition delay-900 animate-spin-slow"
          />
        </div>
      </button>
    </>
  );
}
