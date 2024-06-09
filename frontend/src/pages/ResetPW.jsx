import React from "react";
import { ResetPass } from "../components/Reset";
import "./styles/bg.css";
export const ResetPW = () => {
  return (
    <div
      className="flex justify-center max-x-screen  max-h-full h-screen place-items-center"
      // id="css-selector-fgw"
    >
      <div className="flex w-5/12 ipad:w-10/12 max-h-screen rounded-xl gap-5 bg-snow card-shadow">
        <div className="w-full">
          <ResetPass />
        </div>
      </div>
    </div>
  );
};
