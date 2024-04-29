import { useState } from "react";
import { MatchCycleColors } from "../../backend/components/MatchCycleColors";
import "./gradientColor.css";

function gradientColor(props) {
  const example_color3 = [
    "#FFE162",
    "#C689C6",
    "#C689C6",
    "#B9BC6D",
    "#9681EB",
    "#D83F31",
    "#FFB7B7",
    "#8696FE",
  ];

  return (
    <div className="flex justify-center items-center w-[35px] h-[35px] bg-gray-50 rounded-full">
      <div className="flex w-full h-full justify-center items-center relative overflow-hidden rounded-full">
        <div
          id="c1"
          className="w-[35px] h-[35px] blur-[5px] opacity-80 rounded-full absolute ml-[25px] mt-[25px]"
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(example_color3)[0] + ")",
          }}
        ></div>
        <div
          id="c2"
          className="w-[35px] h-[35px] blur-[5px] opacity-80 rounded-full absolute mb-[25px]"
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(example_color3)[1] + ")",
          }}
        ></div>
        <div
          id="c3"
          className="w-[35px] h-[35px] blur-[5px] opacity-80 rounded-full absolute mr-[25px] mt-[25px]"
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(example_color3)[2] + ")",
          }}
        ></div>
      </div>
      <p className="absolute text-black">{props.date}</p>
    </div>
  );
}

export default gradientColor;
