import React from "react";
import { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import "./styles/bg.css";

export function Auth() {
  useEffect(() => {
    const flipbtn = document.getElementById("flipButton");
    flipbtn.addEventListener("click", function () {
      document.getElementById("flip-card-inner").classList.add("flipped");
    });
  }, []);
  useEffect(() => {
    const flipback = document.getElementById("flipButtonBack");
    flipback.addEventListener("click", function () {
      document.getElementById("flip-card-inner").classList.remove("flipped");
    });
  }, []);

  return (
    <>
      <main
        className="flip-card flex justify-center max-w-screen max-h-screen h-screen place-items-center"
        id="css-selector"
      >
        <div
          className=" flex place-items-center justify-center max-h-full h-4/5 w-screen flip-card-inner m-10"
          id="flip-card-inner"
        >
          <div className="flip-card-front max-w-4xl w-3xl max-h-screen h-4/5">
            <Login />
          </div>
          <div className="flip-card-back max-w-4xl w-3xl max-h-screen h-4/5">
            <Register />
          </div>
        </div>
      </main>
    </>
  );
}
