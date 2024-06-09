import React from "react";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const getUser = (state) => ({ ...state.user });
function Recordbtn() {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    setUserEmail(user.email);
  }, [user]);
  function gotoCalendar() {
    document.getElementById("section2").scrollIntoView({
      behavior: "smooth",
    });
  }
  function goLogin() {
    navigate("/auth");
  }
  return (
    <>
      {user.email ? (
        <button
          className=" inline-flex items-center justify-center rounded-full bg-base-pink px-12 py-3 text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker  w-50 "
          onClick={gotoCalendar}
        >
          บันทึกเลย
        </button>
      ) : (
        <button
          className=" inline-flex items-center justify-center rounded-full bg-base-pink px-12 py-3 text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker  w-50 "
          onClick={goLogin}
        >
          บันทึกเลย
        </button>
      )}
    </>
  );
}
export default Recordbtn;
