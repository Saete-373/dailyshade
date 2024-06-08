import React from "react";
import { useState, useEffect, useContext } from "react";
import api from "../axios";
import "./styles/emotionCircle.css";

function EmotionCircle({ selectColor, setselectColor }) {
  const [colorData, setColorData] = useState([]);

  const [allColor, setAllColor] = useState([]);
  const [numb, setNumb] = useState({});
  const [selectEmoIDX, setSelectEmoIDX] = useState(7);

  const [isActive, setActive] = useState(false);

  const GetColorData = async () => {
    await api
      .get("/getColors")
      .then((res) => {
        console.log(res.data);
        setColorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetColorData();
  }, []);

  useEffect(() => {
    const color_data = colorData.filter((color) => color.color_name != "Numb");
    const numb_data = colorData.filter(
      (color) => color.color_name == "Numb"
    )[0];
    setAllColor(color_data);
    setNumb(numb_data);
  }, [colorData]);

  const onToggle = () => {
    if (isActive == true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const SelectEmo = (index) => {
    setSelectEmoIDX(index);

    setActive(false);

    // localstorage
    setselectColor(allColor[index].color);
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
            {selectEmoIDX != allColor?.length ? (
              <img
                src={allColor[selectEmoIDX]?.emo_pic}
                style={{ transform: "rotate(270deg)" }}
              />
            ) : (
              <img
                src={numb?.emo_pic}
                style={{ transform: "rotate(270deg)" }}
              />
            )}
          </div>
          {allColor?.map((pic, index) => {
            return isActive ? (
              <li
                key={index}
                style={{
                  transform: "rotate(calc(" + (360 / 7) * index + "deg))",
                }}
              >
                <img
                  src={pic?.emo_pic}
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
                <img src={pic?.emo_pic} />
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default EmotionCircle;
