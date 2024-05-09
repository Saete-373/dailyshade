import React from "react";
import { NavLink } from "react-router-dom";
import "./myCSS.css";
function MomentBtn() {
  return (
    <>
      <NavLink to="/momentary">
        <button className="flex border-2 border-white rounded-full w-5 ">
          Rotating Button
        </button>
      </NavLink>
    </>
  );
}

export default MomentBtn;
