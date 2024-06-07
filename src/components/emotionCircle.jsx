import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { EmoDataContext } from "./calendar";
import { EmoContext } from "./calendar";
import { TagContext } from "./calendar";
import "./emotionCircle.css";

function EmotionCircle() {
  const [colorData, setColorData] = useContext(EmoDataContext);
  const [selectColor, setselectColor] = useContext(EmoContext);
  const [isGetTags, setGetTags] = useContext(TagContext);

  const color_data = colorData.filter((color) => color.color_name != "Numb");
  const numb_data = colorData.filter((color) => color.color_name == "Numb")[0];

  const [isActive, setActive] = useState(false);
  const [allColor, setAllColor] = useState(color_data);
  const [numb, setNumb] = useState(numb_data);
  const [selectEmoIDX, setSelectEmoIDX] = useState(7);

  const onToggle = () => {
    if (isActive == true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const SelectEmo = (index) => {
    console.log(numb);
    setSelectEmoIDX(index);
    setselectColor(allColor[index].color);
    setGetTags(true);
    setActive(false);
  };

  return (
    <>
      <div className="screen">
        <div className={`menu ${isActive ? "h-150" : "h-16"}`}>
          <div
            className="toggle"
            onClick={onToggle}
            style={{
              backgroundColor: selectColor,
            }}
          >
            {selectEmoIDX != allColor.length ? (
              <img
                src={allColor[selectEmoIDX].emo_pic}
                style={{ transform: "rotate(270deg)" }}
              />
            ) : (
              <img src={numb.emo_pic} style={{ transform: "rotate(270deg)" }} />
            )}
          </div>
          {allColor.map((pic, index) => {
            return isActive ? (
              <li
                key={index}
                style={{
                  transform: "rotate(calc(" + (360 / 7) * index + "deg))",
                }}
              >
                <img
                  src={pic.emo_pic}
                  style={{
                    transform:
                      "rotate(calc(" + ((360 / -7) * index + 270) + "deg))",
                  }}
                  onClick={() => SelectEmo(index)}
                />
              </li>
            ) : (
              <li
                key={index}
                style={{
                  transitionDelay: "calc(" + 0.1 * index + "s)",
                }}
              >
                <img src={pic.emo_pic} />
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default EmotionCircle;
