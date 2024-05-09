import React from "react";
import EmotionsCard from "./emotionsCard";
function EmotionsCardPanel() {
  return (
    <>
      <div className="flex justify-center mx-5 px-5 py-10">
        <div className="max-w-screen-xl w-4/5 bg-bg-peach p-5 rounded-md ">
          <h3 className="font-normal text-2xl  text-text-color pt-5">
            Get to Know..
          </h3>
          <h1 className="font-serif font-light text-5xl text-text-color">
            Emotions
          </h1>
          <EmotionsCard></EmotionsCard>
        </div>
      </div>
    </>
  );
}
export default EmotionsCardPanel;
