import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./myCSS.css";
function MomentBtn({ filteredRecords }) {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="flex border-2 border-white rounded-full w-5"
        onClick={() => {
          navigate("/momentary", {
            state: { filteredRecords: filteredRecords },
          });
        }}
      >
        Rotating Button
      </button>
    </>
  );
}

export default MomentBtn;
