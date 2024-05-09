import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../../backend/components/Calendar";
import { cn } from "../../backend/components/cn";
import { filteredRecord } from "../../backend/components/filteredRecord";
import { TimePicker } from "antd";
import EmotionCircle from "./emotionCircle";
import GradientColor from "./gradientColor";

export const EmoContext = React.createContext();

function Calendar({ sDay }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [userData, setUserData] = useState("");
  const [records, setRecords] = useState([]);
  const [selectEmoIDX, setSelectEmoIDX] = useState(7);
  const [selectColorID, setSelectColorID] = useState("");
  const [tags, setTags] = useState([]);

  const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
  const fdays = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUser")
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (userData) {
      axios
        .post("http://localhost:5000/gradient/getUserRecord", {
          user_id: userData,
        })
        .then((res) => {
          res.data.forEach(
            (rec) => (rec.datetime = dayjs(rec.datetime, "YYYY-MM-DD HH:mm:ss"))
          );
          setRecords(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (selectEmoIDX != 7) {
      axios
        .get("http://localhost:5000/gradient/getColors")
        .then((res) => {
          const selected_color_id = res.data.map((color) => color._id)[
            selectEmoIDX
          ];
          setSelectColorID(selected_color_id);
          axios
            .post("http://localhost:5000/gradient/getTagsByID", {
              color_id: selected_color_id,
            })
            .then((res) => {
              const allTag = res.data.map((tag) => [tag, false]);
              setTags(allTag);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData, selectEmoIDX]);

  const getDay = (date) => {
    return fdays[date.day()];
  };

  const selectDay = (day) => {
    if (day <= currentDate) {
      setSelectDate(day);
      setToggleAdd(true);
      sDay({
        sdate: day.date(),
        smonth: months[day.month()],
        syear: day.year(),
      });
    }
  };

  const SelectTag = (index) => {
    const updateTags = tags.map((tag, i) => {
      if (i == index) {
        const toggle = tag[1] == false ? true : false;
        return [tag[0], toggle];
      } else {
        return tag;
      }
    });
    setTags(updateTags);
  };

  const handleTime = (time) => {
    // $H = hour, $m = minute
    if (time) {
      setSelectTime(time);
    }
  };

  const HandleSubmit = (evt) => {
    evt.preventDefault();

    const selectedTagIDs = tags
      .filter((tag) => tag[1])
      .map((tag) => tag[0]._id);

    const newDateTime = new dayjs(
      selectDate.year() +
        "-" +
        selectDate.month() +
        "-" +
        selectDate.date() +
        "T" +
        selectTime.hour() +
        ":" +
        selectTime.minute() +
        ":" +
        selectTime.second()
    ).toDate();

    // console.log(newDateTime);
    // console.log(selectColorID);
    // console.log(selectedTagIDs);

    axios
      .post("http://localhost:5000/gradient/addRecord", {
        user_id: userData,
        color_id: selectColorID,
        tag_ids: selectedTagIDs,
        datetime: newDateTime,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <>
      <div className="flex flex-row justify-center p-8 bg-gray-400">
        <div
          className={
            "w-96 h-96 " +
            (toggleAdd ? "rounded-l-3xl" : "rounded-3xl") +
            " bg-fuchsia-950 text-fuchsia-200"
          }
        >
          <div className="flex justify-between px-4 pt-4 ">
            <h1 className="font-semibold ">
              {months[today.month()]}, {today.year() + 543}
            </h1>
            <div className="flex items-center gap-5">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className="cursor-pointer"
                onClick={() => {
                  setToday(currentDate);
                }}
              >
                วันนี้
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-7">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="h-14 grid place-content-center text-sm"
                >
                  {day}
                </h1>
              );
            })}
          </div>
          <div className="w-full grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className="h-12 border-t border-fuchsia-400 grid place-content-center text-sm"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "text-fuchsia-200" : "text-fuchsia-900",
                        today
                          ? "border-gray-400 text-fuchsia-200"
                          : "border-transparent",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "border-gray-200 text-fuchsia-200"
                          : "text-fuchsia-200",
                        date <= currentDate
                          ? "hover:border-gray-300 hover:text-white"
                          : "cursor-not-allowed",
                        "w-10 h-10 border-8  grid place-content-center rounded-full  transition-all cursor-pointer"
                      )}
                      onClick={() => {
                        selectDay(date);
                      }}
                    >
                      {records
                        .map((rec) => rec.datetime.format("YYYY-MM-DD"))
                        .includes(date.format("YYYY-MM-DD")) ? (
                        <GradientColor
                          date={date.date()}
                          filteredRecord={filteredRecord(records, date)}
                        />
                      ) : (
                        <div className="flex justify-center items-center w-[35px] h-[35px] bg-white rounded-full">
                          <p className="absolute text-black">{date.date()}</p>
                        </div>
                      )}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
        {toggleAdd ? (
          <form
            className="flex flex-col w-72 h-96 p-4 rounded-r-3xl bg-fuchsia-950 text-fuchsia-200"
            onSubmit={HandleSubmit}
          >
            <button onClick={() => setToggleAdd(false)}>X</button>
            <div>
              {"วัน" + getDay(selectDate) + "ที่"} {selectDate.date() + " "}
              {months[selectDate.month()]} {selectDate.year() + 543}
            </div>
            <TimePicker
              onChange={handleTime}
              value={selectTime}
              format={"HH:mm"}
            />
            <p>ตอนนี้คุณรู้สึกอย่างไร</p>
            <div className="flex justify-center">
              <EmoContext.Provider value={[selectEmoIDX, setSelectEmoIDX]}>
                <EmotionCircle />
              </EmoContext.Provider>
            </div>
            <p>คำที่สามารถอธิบายความรู้สึกของคุณได้ดีที่สุด</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className={
                    "px-[3px] py-[2px] rounded-lg " +
                    (tags[index][1] ? "bg-gray-400" : "bg-white")
                  }
                  onClick={() => {
                    SelectTag(index);
                  }}
                >
                  {tag[0].tag}
                </div>
              ))}
            </div>
            <button type="submit">บันทึก</button>
            <button>Momentary</button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Calendar;
