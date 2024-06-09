import { useState, useEffect } from "react";
import api from "../axios";
import "./styles/queueColor.css";

function queueColor(props) {
  const size = props.size * 4;

  const [colors, setColors] = useState([]);
  const [circleBlur, setCircleBlur] = useState(size * 0.8);

  const [showColor, setShowColor] = useState();

  let color_ids = [];
  if (props.filteredRecord) {
    color_ids = props.filteredRecord.map((rec) => rec.color_id);
  }

  const GetColorsByID = async () => {
    await api
      .post("/getColorsByID", {
        color_ids: color_ids,
      })
      .then((res) => {
        const removeDuplicateColors = [...new Set(res.data)];

        setColors(removeDuplicateColors);
        setShowColor(removeDuplicateColors[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCircleBlur(size * 0.1);
  }, [colors]);

  useEffect(() => {
    GetColorsByID();
  }, [props.filteredRecord]);

  useEffect(() => {
    if (!showColor) return;
    const intervalId = setInterval(() => {
      const color = [...new Set(colors)];
      const nextIndex = (color.indexOf(showColor) + 1) % colors.length;

      setShowColor(colors[nextIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [showColor, colors]);

  return (
    <div className="flex justify-center items-center w-[87.5%] h-[87.5%] bg-white rounded-full  overflow-hidden">
      <div className="flex w-full h-full justify-center items-center relative rounded-full">
        <div
          className="ball"
          style={{
            backgroundColor: showColor,
            filter: "blur(" + circleBlur + "px)",
          }}
        ></div>
      </div>

      {props.date && <p className="absolute text-black">{props.date}</p>}
    </div>
  );
}

export default queueColor;
