import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../../backend/components/Calendar";
import { cn } from "../../backend/components/cn";
import { TimePicker } from "antd";
import EmotionCircle from "./emotionCircle";
import GradientColor from "./gradientColor";

function Calendar({ sDay }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [selectHour, setSelectHour] = useState();
  const [selectMinute, setSelectMinute] = useState();
  const [userData, setUserData] = useState("");

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
      .get("http://localhost:5000/getUser")
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (userData) {
      axios
        .post("http://localhost:5000/getUserRecord", {
          user_id: userData,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                        "w-10 h-10 border-8  grid place-content-center rounded-full hover:border-gray-300 hover:text-white transition-all cursor-pointer"
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
          <div className="flex flex-col w-72 h-96 p-4 rounded-r-3xl bg-fuchsia-950 text-fuchsia-200">
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
              <EmotionCircle />
            </div>
            <p>คำที่สามารถอธิบายความรู้สึกของคุณได้ดีที่สุด</p>
            <div> {} </div>
            <button>บันทึก</button>
            <button>Momentary</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Calendar;
