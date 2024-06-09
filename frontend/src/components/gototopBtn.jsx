import React from "react";
import { useState } from "react";
import gttcir from "../assets/gttcir.png";
import gttarrow from "../assets/gttarrow.png";

function GototopBtn() {
  const [isShowGoTop, setShowGoTop] = useState(false);

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowGoTop(true);
    } else {
      setShowGoTop(false);
    }
  }
  window.onscroll = function () {
    scrollFunction();
  };
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.getElementById("section1").scrollIntoView({
      behavior: "smooth",
    }); // For Chrome, Firefox, IE and Opera
  }
  return (
    <>
      <div
        onClick={topFunction}
        id="gototop"
        title="Go to top"
        className={
          "fixed rounded-full bg-white/80 p-1 border-2 border-white z-99 cursor-pointer bottom-0 right-0 m-7 " +
          (isShowGoTop ? "block" : "hidden")
        }
      >
        <div className="relative flex place-content-center place-items-center">
          <img
            src={gttarrow}
            alt=""
            className="w-7 absolute hover:animate-bounce"
          />
          <img src={gttcir} alt="" className="w-16  transition delay-900 " />
        </div>
      </div>
    </>
  );
}

export default GototopBtn;
