import React from "react";
import { useState, useEffect, useContext } from "react";
// import { EmailContext } from "../pages/Home";

function Recordbtn() {
  // const [userEmail, setUserEmail] = useContext(EmailContext);

  // const GoToRecord = () => {
  //   if (userEmail) {
  //     // swipe to calendar
  //   } else {
  //     alert("โปรดเข้าสู่ระบบก่อนเริ่มบันทึก");
  //   }
  // };
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
