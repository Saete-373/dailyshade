import { useState, useEffect, useContext, createContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Momentary() {
  const { state } = useLocation();
  const [selectRecords, setSelectRecords] = useState(state.filteredRecords);

  useEffect(() => {
    console.log(selectRecords);
  }, [selectRecords]);

  axios.defaults.withCredentials = true;

  return (
    <>
      <div className="flex max-w-screen justify-center">
        <div className="flex flex-row justify-center w-9/12 max-h-full h-screen place-items-center">
          <div className="w-full max-h-screen h-5/6 border-2 border-black-50 rounded-l-xl gap-5 bg-slate-100">
            <div className="flex row justify-between">
              <GrFormPrevious
                className="w-12 h-12 cursor-pointer"
                onClick={() => {}}
              />
              <h1
                className="text-2xl content-center cursor-pointer"
                onClick={() => {}}
              >
                วันนี้
              </h1>
              <GrFormNext
                className="w-12 h-12 cursor-pointer"
                onClick={() => {}}
              />
            </div>
            <div>
              <ul>
                {selectRecords.map((rec, index) => (
                  <>
                    <li key={index}></li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Momentary;
