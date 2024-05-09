import React from "react";

function GototopBtn() {
  let gototop = document.getElementById("gototop");

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      gototop.style.display = "block";
    } else {
      gototop.style.display = "none";
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
      <button
        onClick={topFunction}
        id="gototop"
        title="Go to top"
        className="fixed rounded-full bg-white/80 p-5 border-2 border-white z-99 cursor-pointer  bottom-0 right-0 m-7 "
      >
        Top
      </button>
    </>
  );
}

export default GototopBtn;
