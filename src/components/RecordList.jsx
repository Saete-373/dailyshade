import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
export const RecordList = () => {
  const { state } = useLocation();
  const [selectRecords, setSelectRecords] = useState(state.filteredRecords);

  useEffect(() => {
    console.log(selectRecords);
  }, [selectRecords]);

  axios.defaults.withCredentials = true;
  return (
    <div>
      {/* <ul>
        {selectRecords.map((rec, index) => (
          <li key={index}></li>
        ))}
      </ul> */}
      
    </div>
  );
};
