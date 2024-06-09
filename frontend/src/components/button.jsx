import React from "react";
import { useState, useEffect, useContext } from "react";

function Recordbtn() {
  function gotoCalendar() {
    document.getElementById("section2").scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <>
      <button
        className=" inline-flex items-center justify-center rounded-full bg-base-pink px-12 py-3 text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker  w-50 ssm:w-40"
        onClick={gotoCalendar}
      >

        บันทึกเลย
      </button>
    </>
  );
}
export default Recordbtn;
