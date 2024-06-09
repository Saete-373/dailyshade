import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import api from "../axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../../../backend/components/Calendar";
import { cn } from "../../../backend/components/cn";
import { filteredRecord } from "../../../backend/components/filteredRecord";
import GradientColor from "./gradientColor";
import AddEmotion from "./addEmotion";
import "./styles/scrollbarCustom.css";

const getUser = (state) => ({ ...state.user });

function Calendar({ sDay }) {
  const user = useSelector(getUser);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  const [selectDate, setSelectDate] = useState(currentDate);

  const [records, setRecords] = useState([]);
  const [toggleAdd, setToggleAdd] = useState(false);

  const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

  useEffect(() => {
    GetUserRecord();
  }, [user.email]);

  useEffect(() => {
    GetUserRecord();
  }, [toggleAdd]);

  const GetUserRecord = async () => {
    if (user.email)
      await api
        .post("/getUserRecord", {
          email: user.email,
        })
        .then((res) => {
          res.data.forEach(
            (rec) =>
              (rec.datetime = dayjs(rec.datetime, "YYYY-MM-DD HH:mm:ssZ"))
          );
          setRecords(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.log);
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

  return (
    <>
      <div className="flex flex-row justify-center px-20 py-20 ipad-mini:px-0">
        <div className="flex ipad:flex-col flex-row px-20 ipad-mini:px-8 w-screen justify-center ipad:place-content-center ipad:place-items-center">
          <div
            className={
              "card-shadow z-10 w-3/5 bg-snow text-text-color p-10 ssm:p-5  ipad:w-full " +
              (toggleAdd
                ? " rounded-xl ipad:rounded-t-xl ipad:rounded-bl-none card-shadow "
                : " rounded-xl")
            }
          >
            <div className="flex justify-between px-8 ssm:px-0 pb-3 ">
              <h1 className="font-semibold ">
                {months[today.month()]}, {today.year() + 543}
              </h1>
              <div className="flex items-center gap-10 ssm:gap-2">
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
                          selectDate.toDate().toDateString() ===
                            date.toDate().toDateString()
                            ? "border-base-pink text-text-color"
                            : today
                            ? "border-base-pink/30 text-text-color"
                            : "border-transparent",
                          date > currentDate
                            ? "cursor-not-allowed"
                            : "cursor-pointer",
                          "w-10 h-10 border-8  grid place-content-center rounded-full hover:border-base-pink transition-all"
                        )}
                        onClick={() => {
                          selectDay(date);
                        }}
                      >
                        {records
                          .map((rec) => rec.datetime.format("YYYY-MM-DD"))
                          .includes(date.format("YYYY-MM-DD")) ? (
                          <div className="flex justify-center items-center w-10 h-10 rounded-full">
                            <GradientColor
                              size={10}
                              date={date.date()}
                              filteredRecord={filteredRecord(records, date)}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center w-[35px] h-[35px] bg-snow rounded-full">
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

          <AddEmotion
            toggleAdd={toggleAdd}
            setToggleAdd={setToggleAdd}
            selectDate={selectDate}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
