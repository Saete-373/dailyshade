import { useState, useEffect, useContext, createContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { DateBar } from "../components/dateBar";
import { RecordList } from "../components/RecordList";

function Momentary() {
  const { state } = useLocation();
  const [selectRecords, setSelectRecords] = useState(state.filteredRecords);

  useEffect(() => {
    console.log(selectRecords);
  }, [selectRecords]);

  axios.defaults.withCredentials = true;

  return (
    <>
      <div className="flex max-w-screen justify-center pt-10">
        <div className="flex flex-row justify-center w-9/12 max-h-full h-screen place-items-center">
          <div className="w-full max-h-screen h-5/6 border-2 border-black-50 rounded-xl gap-5 bg-white/30 p-10">
            <DateBar />
            <RecordList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Momentary;
