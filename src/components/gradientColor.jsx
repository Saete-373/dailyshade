import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { MatchCycleColors } from "../../backend/components/MatchCycleColors";
import "./gradientColor.css";

function gradientColor(props) {
  const [colors, setColors] = useState([]);

  const size = props.size * 4;

  const circle_size = size * 0.125;

  let color_ids = [];
  if (props.filteredRecord) {
    color_ids = props.filteredRecord.map((rec) => rec.color_id);
  }

  const GetColorsByID = async () => {
    await axios
      .post("http://localhost:5000/gradient/getColorsByID", {
        color_ids: color_ids,
      })
      .then((res) => {
        setColors(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetColorsByID();
  }, [props.filteredRecord]);

  useEffect(() => {
    GetColorsByID();
  }, [size]);

  return (
    <div className="flex justify-center items-center w-[87.5%] h-[87.5%] bg-white rounded-full overflow-hidden ">
      <div
        id="c"
        className="flex w-full h-full justify-center items-center relative rounded-full"
      >
        <div
          id="c1"
          className={
            "w-[97.5%] h-[97.5%] blur-[" +
            circle_size.toString() +
            "px] opacity-80 rounded-full absolute mt-[62.5%] ml-[62.5%]"
          }
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[0] + ")",
          }}
        />
        <div
          id="c2"
          className={
            "w-[97.5%] h-[97.5%] blur-[" +
            circle_size.toString() +
            "px] opacity-80 rounded-full absolute mt-[62.5%] mr-[62.5%]"
          }
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[1] + ")",
          }}
        />
        <div
          id="c3"
          className={
            "w-[70%] h-[70%] blur-[" +
            circle_size +
            "px] opacity-80 rounded-full absolute mb-[44.2%]"
          }
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[2] + ")",
          }}
        />
      </div>
      {props.date && <p className="absolute text-black">{props.date}</p>}
    </div>
  );
}

export default gradientColor;
