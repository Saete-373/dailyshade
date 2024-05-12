import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { EmoContext } from "./calendar";
import { TagContext } from "./calendar";
import "./emotionCircle.css";
import cir0 from "../assets/pro0.png";
import cir1 from "../assets/pro1.png";
import cir2 from "../assets/pro2.png";
import cir3 from "../assets/pro3.png";
import cir4 from "../assets/pro4.png";
import cir5 from "../assets/pro5.png";
import cir6 from "../assets/pro6.png";
import cir7 from "../assets/pro7.png";

function EmotionCircle() {
  const [isActive, setActive] = useState(false);
  const [allColor, setAllColor] = useState();
  const [selectEmoIDX, setSelectEmoIDX] = useState(7);
  const [color, setColor] = useContext(EmoContext);
  const [isGetTags, setGetTags] = useContext(TagContext);

  const emo_pics = [cir1, cir2, cir3, cir4, cir5, cir6, cir7];

  useEffect(() => {
    axios
      .get("http://localhost:5000/gradient/getColors")
      .then((res) => {
        setAllColor(res.data.map((color) => color.color));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onToggle = () => {
    if (isActive == true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const SelectEmo = (index) => {
    setSelectEmoIDX(index);
    setColor(allColor[index]);
    setGetTags(true);
    setActive(false);
  };

  return (
    <>
      <div className="screen">
        <div className="menu">
          <div
            className="toggle"
            onClick={onToggle}
            style={{ backgroundColor: color }}
          >
            {selectEmoIDX >= 0 && selectEmoIDX <= emo_pics.length - 1 ? (
              <img src={emo_pics[selectEmoIDX]} />
            ) : (
              <img src={cir0} />
            )}
          </div>
          {emo_pics.map((pic, index) => {
            return isActive ? (
              <li
                key={index}
                style={{
                  transform: "rotate(calc(" + (360 / 7) * index + "deg))",
                }}
              >
                <img
                  src={pic}
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
                <img src={pic} />
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default EmotionCircle;
