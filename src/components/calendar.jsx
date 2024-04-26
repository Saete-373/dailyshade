import { useState } from "react";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../../backend/components/Calendar";
import { cn } from "../../backend/components/cn";
import { TimePicker } from "antd";
import EmotionCircle from "./emotionCircle";

function Calendar(props) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [time, setTime] = useState();

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

  const getDay = (date) => {
    return fdays[date.day()];
  };

  const selectDay = (day) => {
    setSelectDate(day);
    setToggleAdd(true);
    props.sDay({
      sdate: day.date(),
      smonth: months[day.month()],
      syear: day.year(),
    });
  };

  const handleTime = (time) => {
    // $H = hour, $m = minute
    setTime(time);
  };

  return (
    <div className="flex flex-row justify-center p-8 bg-gray-400">
      <div
        className={
          "w-96 h-96 rounded" +
          (toggleAdd ? "-l" : "") +
          "-3xl bg-fuchsia-950 text-fuchsia-200"
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
                      today ? "bg-fuchsia-600 text-fuchsia-200" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-fuchsia-800 text-fuchsia-200"
                        : "text-fuchsia-200",
                      "h-10 w-10 grid place-content-center rounded-full hover:bg-fuchsia-800 hover:text-white transition-all cursor-pointer"
                    )}
                    onClick={() => {
                      selectDay(date);
                    }}
                  >
                    {date.date()}
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
          <TimePicker onChange={handleTime} value={time} format="HH:mm" />
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
  );
}

export default Calendar;
