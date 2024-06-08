import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { useLocation } from "react-router-dom";
import api from "../axios";
export const RecordList = () => {
  const { state } = useLocation();
  const [selectRecords, setSelectRecords] = useState(state.filteredRecords);

  useEffect(() => {
    console.log(selectRecords);
  }, [selectRecords]);


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
