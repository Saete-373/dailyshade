import React from "react";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../axios";
import DSlogo from "../assets/logo.png";
import happy from "../assets/E4_Happy.png";
import "./styles/navbar.css";
import CLIENT_PATH from "../clientPath";

const getUser = (state) => ({ ...state.user });

function toggleDropdown() {
  const list = document.querySelector("#dropdown");
  list.classList.toggle("hidden");
}

function gotoCalendar() {
  document.getElementById("section2").scrollIntoView({
    behavior: "smooth",
  });
}

function gotoEmotions() {
  document.getElementById("section3").scrollIntoView({
    behavior: "smooth",
  });
}
function gotoIns() {
  document.getElementById("section4").scrollIntoView({
    behavior: "smooth",
  });
}
function StickyNavbar() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    GetUserData();
  }, [user]);

  const GetUserData = async () => {
    await api
      .post("/getUserData", {
        email: user.email,
      })
      .then((res) => {
        setUserData(res.data);
        setImage(res.data?.user_pic);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = async () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.location.href = CLIENT_PATH + "/auth";
  };

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 mx-auto border  bg-snow py-3 shadow backdrop-blur-lg max-w-full">
        <div className="px-10">
          <div className="flex items-center justify-between ">
            <div className="flex shrink-0 w-1/5 ipad:w-2/4">
              <a aria-current="page" className="flex items-center" href="/">
                <img className="h-10 w-auto rounded-lg" src={DSlogo} alt="" />
                <p className="inline-block rounded-lg px-3 py-1 text-lg font-medium font-serif text-text-color transition-all duration-200 ">
                  DailyShade
                </p>
              </a>
            </div>
            <div className="w-3/5 lg:flex lg:w-auto ipad:flex ipad:justify-end ipad:place-content-end ipad:w-2/4 ">
              <ul className=" flex  p-4 md:p-0 mt-4 flex-row md:space-x-8 md:mt-0 ipad:hidden justify-center">
                <li>
                  <a
                    aria-current="page"
                    className="group inline-block  px-6 py-1  text-text-color"
                    href="/"
                  >
                    หน้าหลัก
                    <div className="bg-base-pink h-[3px] w-0 group-hover:w-full transition-all duration-500 "></div>
                  </a>
                </li>
                <li>
                  <a
                    className="group inline-block  px-6 py-1  text-text-color cursor-pointer"
                    onClick={gotoCalendar}
                  >
                    ปฏิทิน
                    <div className="bg-base-pink h-[3px] w-0 group-hover:w-full transition-all duration-500 "></div>
                  </a>
                </li>
                <li>
                  <a
                    className="group inline-block  px-6 py-1  text-text-color cursor-pointer"
                    onClick={gotoEmotions}
                  >
                    รู้จักอารมณ์
                    <div className="bg-base-pink h-[3px] w-0 group-hover:w-full transition-all duration-500 "></div>
                  </a>
                </li>
                <li>
                  <a
                    className="group inline-block  px-6 py-1  text-text-color cursor-pointer"
                    onClick={gotoIns}
                  >
                    Instagram
                    <div className="bg-base-pink h-[3px] w-0 group-hover:w-full transition-all duration-500 "></div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-end gap-4 w-1/5 ">
              {user.email ? (
                <div className="flex topnav " id="myTopnav">
                  <a href="/account">
                    <img
                      id="dropdownButton"
                      className="h-10 w-10 inline-block rounded-full hover:ring-2 hover:ring-pink-darker border-2 border-base-pink "
                      src={
                        image !== "" && image != undefined
                          ? "../../public/imageGalleries/" + image
                          : happy
                      }
                      alt=""
                    ></img>
                  </a>
                </div>
              ) : (
                <div className="flex gap-2 ssm:hidden ipad:items-end ipad:justify-end topnav">
                  <a
                    className="inline-flex items-center justify-center rounded-full bg-base-pink px-3 py-2 text-sm  text-text-color shadow-sm transition-all duration-150 hover:bg-pink-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    href="/auth"
                  >
                    เข้าสู่ระบบ
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default StickyNavbar;
