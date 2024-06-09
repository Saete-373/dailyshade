import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import api from "../axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import CLIENT_PATH from "../clientPath";
import { getDay } from "../../../backend/components/convertThaiDays";
import { months } from "../../../backend/components/Calendar";
import { filteredRecord } from "../../../backend/components/filteredRecord";
import GradientColor from "../components/gradientColor";
import { GiNotebook } from "react-icons/gi";
import noteIcon from "../assets/note.png";
import "./Momentary.css";

const getUser = (state) => ({ ...state.user });

function Momentary() {
  const user = useSelector(getUser);
  const select_date = dayjs(
    JSON.parse(window.localStorage.getItem("selectDate"))
  );
  const [selectRecords, setSelectRecords] = useState([]);
  const [countEmotions, setCountEmotions] = useState([]);
  const [sDate, setSDate] = useState(select_date);
  const [allEmotion, setAllEmotion] = useState();
  const [allTag, setAllTag] = useState();
  const [toggleEdit, setToggleEdit] = useState();
  const [note, setNote] = useState("");

  const fetchColors = async () => {
    await api
      .get("/getColors")
      .then((res) => {
        setAllEmotion(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.log);
      });
  };

  const fetchTags = async () => {
    await api
      .get("/getTags")
      .then((res) => {
        const tag_data = res.data.map(
          (tag) => new Object({ tag_id: tag._id, tag: tag.tag })
        );
        setAllTag(tag_data);
      })
      .catch((err) => {
        toast.error(err.response.data.log);
      });
  };

  const GetUserRecord = async (_selectDate = sDate) => {
    if (user.email)
      await api
        .post("/getUserRecord", {
          email: user.email,
        })
        .then((res) => {
          if (res.data != null) {
            const convRecords = res.data?.map((rec) => ({
              ...rec,
              datetime: dayjs(rec.datetime, "YYYY-MM-DD HH:mm:ssZ"),
            }));

            const filter_record = filteredRecord(convRecords, _selectDate);

            if (filter_record !== null) {
              const sorted_record = sortByDatetime(filter_record);

              setSelectRecords(sorted_record);
              setCountEmotions(groupByColorId(sorted_record));
            } else {
              setSelectRecords([]);
              setCountEmotions([]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.log);
        });
  };

  useEffect(() => {
    GetUserRecord();
  }, [user.email]);

  useEffect(() => {
    fetchColors();
    fetchTags();
  }, []);

  const sortByDatetime = (data) => {
    return data.sort((a, b) => {
      const dateA = dayjs(a.datetime);
      const dateB = dayjs(b.datetime);

      return dateA.isBefore(dateB) ? -1 : 1;
    });
  };

  const groupByColorId = (_record) => {
    const colorCounts = {};

    _record?.forEach((rec) => {
      const colorId = rec.color_id;

      if (colorCounts.hasOwnProperty(colorId)) {
        colorCounts[colorId] += 1;
      } else {
        colorCounts[colorId] = 1;
      }
    });

    const result = Object.entries(colorCounts).map(([colorId, count]) => ({
      color_id: colorId,
      count: count,
    }));

    return result;
  };

  const handleDelete = async (_recID) => {
    await api
      .post("/deleteRecord", {
        rec_id: _recID,
      })
      .then((res) => {
        console.log(res.data.log);
        toast.success(res.data.log);
        window.location.href = CLIENT_PATH + "/momentary";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.log);
      });
  };

  const handlePrevDay = () => {
    const prev_day = sDate.subtract(1, "day");
    setSDate(prev_day);
    GetUserRecord(prev_day);
    if (window.localStorage.getItem("selectDate")) {
      window.localStorage.removeItem("selectDate");
      window.localStorage.setItem("selectDate", JSON.stringify(prev_day));
    } else {
      window.localStorage.setItem("selectDate", JSON.stringify(prev_day));
    }
  };

  const handleNextDay = () => {
    const next_day = sDate.add(1, "day");
    setSDate(next_day);
    GetUserRecord(next_day);
    if (window.localStorage.getItem("selectDate")) {
      window.localStorage.removeItem("selectDate");
      window.localStorage.setItem("selectDate", JSON.stringify(next_day));
    } else {
      window.localStorage.setItem("selectDate", JSON.stringify(next_day));
    }
  };

  return (
    <>
      <div className="flex max-w-screen min-h-screen justify-center">
        <div className="flex justify-center w-9/12 h-full place-items-center m-5 ipad-mini:w-11/12">
          <div className="card-shadow2 w-full h-5/6  bg-snow rounded-xl p-10 flex flex-col gap-y-10 justify-center place-items-center">
            <div className="flex flex-row w-full justify-between">
              <button onClick={handlePrevDay}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#031602"
                  className="w-10 h-10 ipad-mini:w-6 ipad-mini:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h1 className="text-2xl ipad-mini:text-lg content-center cursor-pointer text-oil-slick">
                {sDate && (
                  <label>
                    {"วัน" + getDay(sDate) + "ที่"} {sDate.date() + " "}
                    {months[sDate.month()]} {sDate.year() + 543}
                  </label>
                )}
              </h1>
              <button onClick={handleNextDay}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#031602"
                  className="w-10 h-10  ipad-mini:w-6 ipad-mini:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
            {selectRecords.length > 0 ? (
              <div className="w-full flex flex-col gap-y-10">
                <p className="text-start text-slate-700">Momentary Emotions</p>
                <ul className="flex flex-col gap-y-5">
                  {selectRecords?.map((rec, index) => (
                    <li
                      key={index}
                      className="flex w-full px-5 ssm:px-0 place-items-start justify-between"
                    >
                      <div className="flex w-2/6 place-items-center gap-2">
                        <label className="w-1/2 ipad-mini:w-15 ipad-mini:text-sm">
                          {dayjs(rec.datetime).hour()} :{" "}
                          {dayjs(rec.datetime).minute()}
                        </label>
                        <div className="">
                          <img
                            src={allEmotion
                              ?.filter((emo) => emo._id === rec.color_id)
                              .map((emo) => emo.emo_pic)}
                            className="w-14 h-14 ipad-mini:w-10 ipad-mini:h-10"
                          />
                        </div>
                      </div>

                      <div className="flex w-3/6 flex-col items-start">
                        <label className="text-lg ipad-mini:text-md font-normal">
                          {allEmotion
                            ?.filter((emo) => emo._id === rec.color_id)
                            .map((emo) => emo.color_name)}
                        </label>
                        <ul className="flex flex-row gap-1 flex-wrap pt-2">
                          {allTag
                            ?.filter((tag) => rec.tags.includes(tag.tag_id))
                            .map((tag, index) => (
                              <li
                                key={index}
                                className=" bg-base-pink px-5 py-1 text-sm rounded-2xl"
                              >
                                {tag.tag}
                              </li>
                            ))}
                        </ul>
                        {rec.note ? (
                          <div className="flex  place-items-end justify-end">
                            <div className="w-10 m-2 z-10">
                              <img src={noteIcon} alt="" />
                            </div>
                            <p className="-ml-2 mt-2 py-3 border-2 border-base-pink bg-white rounded-lg p-5  ">
                              {rec.note}
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex w-1/6 ipad-mini:w-2 place-items-center justify-end">
                        <button
                          onClick={() => handleDelete(rec._id)}
                          className="svg-button w-1/2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 svg-one"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#FF0000"
                            className="size-6 svg-two"
                          >
                            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                            <path
                              fillRule="evenodd"
                              d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <AddRecord /> */}
                <div className="w-full">
                  <p className="text-start text-slate-700">สรุปผล</p>
                  {selectRecords && (
                    <div className="flex flex-row ipad-mini:flex-col justify-center place-items-center">
                      <div className="flex justify-center items-center w-80 h-80 ipad-mini:w-52 ipad-mini:h-52 rounded-full">
                        <GradientColor
                          size={36}
                          filteredRecord={selectRecords}
                        />
                      </div>
                      <ul className="flex flex-col ">
                        {countEmotions.map((cemo, index) => (
                          <li key={index} className="flex gap-3 ">
                            <label className="">{cemo.count}</label>
                            <label className="flex">
                              {allEmotion
                                ?.filter((emo) => emo._id === cemo.color_id)
                                .map((emo) => emo.color_name)}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>ยังไม่มีการบันทึก</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Momentary;
