import React from "react";
import EmotionsCard from "./emotionsCard";
import "./myCSS.css";
function EmotionsCardPanel() {
  return (
    <>
      <div className="flex justify-center lg:mx-5 lg:px-5 py-10 ">
        <div className="max-w-screen-xl w-5/6 bg-bg-peach p-5 rounded-xl ipad:w-50">
          <h3 className=" text-2xl  text-text-color pt-5">Get to Know..</h3>
          <h1 className="font-serif font-light text-5xl text-text-color">
            Emotions
          </h1>
          <div className="ipad:flex ipad:overflow-x-auto scroll-bar-hidden ipad:relative ipad:snap-mandatory ipad:snap-x ipad:scroll-smooth ipad:flex-1">
            <EmotionsCard />
          </div>
        </div>
      </div>
    </>
  );
}
export default EmotionsCardPanel;
