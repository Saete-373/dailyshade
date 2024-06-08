import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { MatchCycleColors } from "../../../backend/components/MatchCycleColors";
import "./styles/gradientColor.css";

function gradientColor(props) {
  const size = props.size * 4;

  const [colors, setColors] = useState([]);
  const [circleBlur, setCircleBlur] = useState(size * 0.125);

  const c1_style =
    "w-[97.5%] h-[97.5%] opacity-80 rounded-full absolute mt-[62.5%] ml-[62.5%]";

  const c2_style =
    "w-[97.5%] h-[97.5%] opacity-80 rounded-full absolute mt-[62.5%] mr-[62.5%]";

  const c3_style =
    "w-[70%] h-[70%] opacity-80 rounded-full absolute mb-[44.2%]";

  let color_ids = [];
  if (props.filteredRecord) {
    color_ids = props.filteredRecord.map((rec) => rec.color_id);
  }

  const GetColorsByID = async () => {
    await axios
      .post(process.env.REACT_API + "/getColorsByID", {
        color_ids: color_ids,
      })
      .then((res) => {
        setColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCircleBlur(size * 0.125);
  }, [colors]);

  useEffect(() => {
    GetColorsByID();
  }, [props.filteredRecord]);

  return (
    <div className="flex justify-center items-center w-[87.5%] h-[87.5%] bg-white rounded-full overflow-hidden ">
      <div
        id="c"
        className="flex w-full h-full justify-center items-center relative rounded-full"
      >
        <div
          id="c1"
          className={c1_style}
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[0] + ")",
            filter: "blur(" + circleBlur + "px)",
          }}
        />
        <div
          id="c2"
          className={c2_style}
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[1] + ")",
            filter: "blur(" + circleBlur + "px)",
          }}
        />
        <div
          id="c3"
          className={c3_style}
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[2] + ")",
            filter: "blur(" + circleBlur + "px)",
          }}
        />
      </div>
      {props.date && <p className="absolute text-black">{props.date}</p>}
    </div>
  );
}

export default gradientColor;
