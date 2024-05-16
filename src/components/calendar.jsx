import React from "react";
import { useState, useEffect, useContext, useReducer } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { EmailContext } from "../pages/Home";
import { generateDate, months } from "../../backend/components/Calendar";
import { cn } from "../../backend/components/cn";
import { filteredRecord } from "../../backend/components/filteredRecord";
import { getDay } from "../../backend/components/convertThaiDays";
import { SelectTag } from "../../backend/components/selectTag";
import { TimePicker } from "antd";
import EmotionCircle from "./emotionCircle";
import GradientColor from "./gradientColor";
import MomentBtn from "./momentButton";

export const EmoDataContext = React.createContext();
export const EmoContext = React.createContext();
export const TagContext = React.createContext();

function Calendar({ sDay }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [selectTime, setSelectTime] = useState(currentDate);

  const [userEmail, setUserEmail] = useContext(EmailContext);
  const [colorData, setColorData] = useState([]);
  const [records, setRecords] = useState([]);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [selectColor, setselectColor] = useState("#888888");
  const [selectColorID, setSelectColorID] = useState("");
  const [tags, setTags] = useState([]);
  const [isGetTags, setGetTags] = useState(true);

  const reducerR = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.newRecord];
      case "REFRESH":
        return state;
      default:
        return state;
    }
  };

  const initialState = records;

  const [recordReducer, dispatch] = useReducer(reducerR, initialState);

  const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch({ type: "REFRESH" });

    if (userEmail) {
      GetUserRecord();

      GetColorData();

      if (selectColor != "#888888") {
        if (isGetTags) GetTags();
      }
    }
  }, [userEmail, recordReducer, selectColor, isGetTags]);

  const GetUserRecord = () => {
    axios
      .post("http://localhost:5000/gradient/getUserRecord", {
        email: userEmail,
      })
      .then((res) => {
        res.data.forEach(
          (rec) => (rec.datetime = dayjs(rec.datetime, "YYYY-MM-DD HH:mm:ssZ"))
        );
        setRecords(res.data);
        console.log("yay");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetTags = () => {
    axios
      .post("http://localhost:5000/gradient/getTagsByColor", {
        selected_color: selectColor,
      })
      .then((res) => {
        console.log(res.data);
        const filter_1tag = res.data.filter((tag) => tag.color_id.length == 1);
        const color_id = filter_1tag[0].color_id[0];
        const allTag = res.data.map((tag) => [tag, false]);
        console.log(allTag);
        setSelectColorID(color_id);
        setTags(allTag);
      })
      .catch((err) => {
        console.log(err);
      });
    setGetTags(false);
  };

  const GetColorData = () => {
    axios
      .get("http://localhost:5000/gradient/getColors")
      .then((res) => {
        setColorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleTime = (time) => {
    setSelectTime(time);
  };

  const HandleSubmit = async (evt) => {
    evt.preventDefault();

    const selectedTagIDs = tags
      .filter((tag) => tag[1])
      .map((tag) => tag[0]._id);

    const newDateTime = new dayjs(
      selectDate.year() +
        "-" +
        (selectDate.month() + 1) +
        "-" +
        selectDate.date() +
        "T" +
        selectTime.hour() +
        ":" +
        selectTime.minute() +
        ":" +
        selectTime.second()
    ).toDate();

    axios
      .post("http://localhost:5000/gradient/addRecord", {
        email: userEmail,
        color_id: selectColorID,
        tag_ids: selectedTagIDs,
        datetime: newDateTime,
      })
      .then((res) => {
        console.log(res.data.log);
        dispatch({ type: "ADD", newRecord: res.data.newRecord });
      })
      .catch((err) => {
        console.log(err);
      });
    setToggleAdd(false);
    setGetTags(true);
  };

  return (
    <>
      <div className="flex w-screen flex-row justify-center px-20 py-20">
        <div className="flex flex-row px-20 w-screen justify-center ">
          <div
            className={
              "w-3/5 h-3/6" +
              (toggleAdd ? "rounded-l-xl" : "rounded-xl") +
              " bg-white/60 text-text-color p-10 border-white border-2"
            }
          >
            <div className="flex justify-between px-8 pb-3 ">
              <h1 className="font-semibold ">
                {months[today.month()]}, {today.year() + 543}
              </h1>
              <div className="flex items-center gap-10">
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
                      className="h-12 grid place-content-center text-sm py-7"
                    >
                      <h1
                        className={cn(
                          currentMonth ? "text-text-color" : "text-text-color",
                          today
                            ? "border-base-pink text-text-color"
                            : "border-transparent",
                          selectDate.toDate().toDateString() ===
                            date.toDate().toDateString()
                            ? "border-base-pink text-text-color"
                            : "text-text-color",
                          date > currentDate
                            ? "cursor-not-allowed"
                            : "cursor-pointer",
                          "w-10 h-10 border-8  grid place-content-center rounded-full hover:border-base-pink transition-all "
                        )}
                        onClick={() => {
                          selectDay(date);
                          console.log(date.format("YYYY-MM-DD"));
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
              className="flex flex-col w-2/5 p-4 rounded-r-xl bg-white/30 text-text-color px-16 "
              onSubmit={HandleSubmit}
            >
              <button
                onClick={() => setToggleAdd(false)}
                className="place-self-end"
              >
                X
              </button>

              <div className="pb-5">
                {"วัน" + getDay(selectDate) + "ที่"} {selectDate.date() + " "}
                {months[selectDate.month()]} {selectDate.year() + 543}
                <span className="pl-5">
                  <TimePicker
                    onChange={handleTime}
                    value={selectTime}
                    defaultValue={currentDate}
                    format={"HH:mm"}
                    className="w-20"
                  />
                </span>
              </div>

              <p className="pb-5">ตอนนี้คุณรู้สึกอย่างไร</p>
              <div className="flex justify-center pb-5">
                <EmoDataContext.Provider value={[colorData, setColorData]}>
                  <EmoContext.Provider value={[selectColor, setselectColor]}>
                    <TagContext.Provider value={[isGetTags, setGetTags]}>
                      <EmotionCircle />
                    </TagContext.Provider>
                  </EmoContext.Provider>
                </EmoDataContext.Provider>
              </div>
              <div>
                <div className="pb-5">
                  <p className="pb-3">
                    คำที่สามารถอธิบายความรู้สึกของคุณได้ดีที่สุด
                  </p>

                  <ul className="flex flex-wrap row gap-1">
                    {tags.map((tag, index) => (
                      <li
                        key={index}
                        className={
                          "border-white border-2 px-5 rounded-2xl cursor-pointer " +
                          (tags[index][1] ? "bg-gray-400" : "bg-white")
                        }
                        onClick={() => {
                          setTags(SelectTag(tags, index));
                        }}
                      >
                        {tag[0].tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-centers place-content-center  ">
                  <div>
                    <button
                      type="submit"
                      className=" inline-flex items-center justify-center rounded-full bg-base-pink px-12 py-3 text-sm  text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker w-full"
                    >
                      บันทึกเลย
                    </button>
                  </div>
                  <div className="">
                    <MomentBtn
                      filteredRecords={filteredRecord(records, selectDate)}
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Calendar;
