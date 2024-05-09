import { useState, useEffect } from "react";
import axios from "axios";
import { MatchCycleColors } from "../../backend/components/MatchCycleColors";
import "./gradientColor.css";

function gradientColor(props) {
  const [colors, setColors] = useState([]);
  const example_color3 = [
    "#FFE162",
    "#C689C6",
    "#C689C6",
    "#B9BC6D",
    "#9681EB",
    "#D83F31",
    "#FFB7B7",
    "#8696FE",
  ];

  let color_ids = [];
  if (props.filteredRecord) {
    color_ids = props.filteredRecord.map((rec) => rec.color_id);
  }


  useEffect(() => {
    axios
      .post("http://localhost:5000/gradient/getColorsByID", {
        color_ids: color_ids,
      })
      .then((res) => {
        setColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [color_ids]);

  return (
    <div className="flex justify-center items-center w-[35px] h-[35px] bg-white rounded-full">
      {/* overflow-hidden */}
      <div
        id="c"
        className="flex w-full h-full justify-center items-center relative overflow-hidden rounded-full"
      >
        <div
          id="c1"
          className="w-[35px] h-[35px] blur-[5px] opacity-80 rounded-full absolute ml-[17.67766953px] mt-[17.67766953px]"
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[0] + ")",
          }}
        ></div>
        <div
          id="c2"
          className="w-[35px] h-[35px] blur-[5px] opacity-80 rounded-full absolute mb-[25px]"
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[1] + ")",
          }}
        ></div>
        <div
          id="c3"
          className="w-[35px] h-[35px] blur-[5px] opacity-80 rounded-full absolute mr-[17.67766953px] mt-[17.67766953px]"
          style={{
            backgroundImage:
              "conic-gradient(" + MatchCycleColors(colors)[2] + ")",
          }}
        ></div>
      </div>

      <p className="absolute text-black">{props.date}</p>
    </div>
  );
}

export default gradientColor;
