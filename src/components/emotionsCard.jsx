import React from "react";
import { useState } from "react";
import pic from "../assets/3.png";
import happy from "../assets/Happy.png";
import surprise from "../assets/Surprise.png";
import angry from "../assets/Angry.png";
import sad from "../assets/Sad.png";
import bad from "../assets/Bad.png";
import fearful from "../assets/Fearful.png";
import disgusted from "../assets/Disgutsed.png";

function EmotionsCard() {
  const emotions = [
    {
      image: happy,
      name: "Happy",
      description: "ความรู้สึกที่คุณ..",
    },
    {
      image: surprise,
      name: "Surprise",
      description:
        "having a sense of confidence in or satisfaction with (a person, arrangement, or situation).",
    },
    {
      image: sad,
      name: "Sad",
      description:
        "having a sense of confidence in or satisfaction with (a person, arrangement, or situation).",
    },
    {
      image: bad,
      name: "Bad",
      description:
        "having a sense of confidence in or satisfaction with (a person, arrangement, or situation).",
    },
    {
      image: angry,
      name: "Angry",
      description:
        "having a sense of confidence in or satisfaction with (a person, arrangement, or situation).",
    },
    {
      image: fearful,
      name: "Fearful",
      description:
        "having a sense of confidence in or satisfaction with (a person, arrangement, or situation).",
    },
    {
      image: disgusted,
      name: "Disgusted",
      description:
        "having a sense of confidence in or satisfaction with (a person, arrangement, or situation).",
    },
  ];

  return (
    <>
      <div className="flex gap-5 flex-wrap m-8 justify-center">
        {emotions.map((emotion, index) => (
          <div
            key={index}
            className="flex flex-col flex-none justify-centent-center rounded-md bg-white/70 py-10 px-2 max-w-56 w-56"
          >
            <div className="flex justify-center pb-2">
              <img
                src={emotion.image}
                className="rounded-full max-w-56 w-24"
              ></img>
            </div>
            <h2
              className="text-2xl font-medium text-neutral-800 uppercase pb-1"
              id="emotionName"
            >
              {emotion.name}
            </h2>
            <p id="emotionDescription" className="text-pretty leading-relaxed">
              {emotion.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
export default EmotionsCard;
