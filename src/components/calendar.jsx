import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../../backend/components/Calendar";
import { cn } from "../../backend/components/cn";
import { TimePicker } from "antd";
import EmotionCircle from "./emotionCircle";
import GradientColor from "./gradientColor";
import Recordbtn from "./button";
import MomentBtn from "./momentButton";
function Calendar({ sDay }) {
  const currentDate = dayjs();
  const currentTime = dayjs().format("HH mm");
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [selectHour, setSelectHour] = useState();
  const [selectMinute, setSelectMinute] = useState();

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUser")
      .then((res) => {
        axios
          .post("http://localhost:5000/gradient/getUserRecord", {
            user_id: res.data,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDay = (date) => {
    return fdays[date.day()];
  };

  const selectDay = (day) => {
    setSelectDate(day);
    setToggleAdd(true);
    sDay({
      sdate: day.date(),
      smonth: months[day.month()],
      syear: day.year(),
    });
  };

  const handleTime = (time) => {
    // $H = hour, $m = minute
    if (time) {
      setSelectHour(time.$H);
      setSelectMinute(time.$m);
      setSelectTime(time);
    }
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
                          "w-10 h-10 border-8  grid place-content-center rounded-full hover:border-base-pink transition-all cursor-pointer"
                        )}
                        onClick={() => {
                          selectDay(date);
                        }}
                      >
                        <GradientColor date={date.date()} />
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {toggleAdd ? (
            <div className="flex flex-col w-2/5 p-4 rounded-r-xl bg-white/30 text-text-color px-16 ">
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
                  {" "}
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
                <EmotionCircle />
              </div>
              <div>
                <div className="pb-5">
                  <p className="pb-3">
                    คำที่สามารถอธิบายความรู้สึกของคุณได้ดีที่สุด
                  </p>
                  <ul className="flex flex-wrap row gap-1">
                    <li className="border-white border-2 bg-white/90 px-5 rounded-2xl">
                      หี
                    </li>
                    <li className="border-white border-2 bg-white/90 px-5 rounded-2xl">
                      ควย
                    </li>
                    <li className="border-white border-2 bg-white/90 px-5 rounded-2xl">
                      แตด
                    </li>
                    <li className="border-white border-2 bg-white/90 px-5 rounded-2xl">
                      หีควยแตด
                    </li>
                    <li className="border-white border-2 bg-white/90 px-5 rounded-2xl">
                      หีควยแตด
                    </li>
                    <li className="border-white border-2 bg-white/90 px-5 rounded-2xl">
                      หีควยแตด
                    </li>
                  </ul>
                </div>
                <div className="flex justify-centers place-content-center  ">
                  <div>
                    <Recordbtn />
                  </div>
                  <div className="">
                    <MomentBtn />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Calendar;
