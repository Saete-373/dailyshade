import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { getDay } from "../../backend/components/convertThaiDays";
import { months } from "../../backend/components/Calendar";
import { filteredRecord } from "../../backend/components/filteredRecord";
import GradientColor from "../components/gradientColor";
import { DateBar } from "../components/dateBar";
import { RecordList } from "../components/RecordList";

function Momentary() {
  const select_date = dayjs(
    JSON.parse(window.localStorage.getItem("selectDate"))
  );
  const [selectRecords, setSelectRecords] = useState([]);
  const [countEmotions, setCountEmotions] = useState([]);
  const [sDate, setSDate] = useState(select_date);
  const [isFindUser, setFindUser] = useState(true);
  const [userEmail, setUserEmail] = useState();
  const [allEmotion, setAllEmotion] = useState();
  const [allTag, setAllTag] = useState();
  const [toggleEdit, setToggleEdit] = useState();

  const getUser = async () => {
    await axios
      .get("http://localhost:5000/user/getUser")
      .then((res) => {
        if (res.data.isLogin) {
          setUserEmail(res.data.email);
        }
        setFindUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchColors = async () => {
    await axios
      .get("http://localhost:5000/gradient/getColors")
      .then((res) => {
        setAllEmotion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTags = async () => {
    await axios
      .get("http://localhost:5000/gradient/getTags")
      .then((res) => {
        const tag_data = res.data.map(
          (tag) => new Object({ tag_id: tag._id, tag: tag.tag })
        );
        setAllTag(tag_data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetUserRecord = async (_selectDate = sDate) => {
    await axios
      .post("http://localhost:5000/gradient/getUserRecord", {
        email: userEmail,
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
      });
  };

  useEffect(() => {
    if (isFindUser) {
      getUser();
    }
    if (userEmail) GetUserRecord();
  }, [userEmail]);

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
    await axios
      .post("http://localhost:5000/gradient/deleteRecord", {
        rec_id: _recID,
      })
      .then((res) => {
        console.log(res.data.log);

        window.location.href = "http://localhost:5173/momentary";
      })
      .catch((err) => {
        console.log(err);
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

  axios.defaults.withCredentials = true;

  return (
    <>
      <div className="flex max-w-screen justify-center pt-10">
        <div className="flex flex-row justify-center w-9/12 max-h-full h-screen place-items-center">
          <div className="w-full max-h-screen h-5/6 border-2 border-black-50 rounded-l-xl gap-5">
            <div className="flex row justify-between">
              <GrFormPrevious
                className="w-12 h-12 cursor-pointer"
                onClick={handlePrevDay}
              />
              <h1 className="text-2xl content-center cursor-pointer">
                {sDate && (
                  <label>
                    {"วัน" + getDay(sDate) + "ที่"} {sDate.date() + " "}
                    {months[sDate.month()]} {sDate.year() + 543}
                  </label>
                )}
              </h1>
              <GrFormNext
                className="w-12 h-12 cursor-pointer"
                onClick={handleNextDay}
              />
            </div>
            {/* {console.log(selectRecords.length)} */}
            {selectRecords.length > 0 ? (
              <div>
                <ul className="flex flex-col">
                  {selectRecords?.map((rec, index) => (
                    <li key={index} className="flex">
                      <label>
                        {dayjs(rec.datetime).hour()} :{" "}
                        {dayjs(rec.datetime).minute()} น.
                      </label>
                      <img
                        src={allEmotion
                          ?.filter((emo) => emo._id === rec.color_id)
                          .map((emo) => emo.emo_pic)}
                        className="w-12 h-12"
                      />
                      <label>
                        {allEmotion
                          ?.filter((emo) => emo._id === rec.color_id)
                          .map((emo) => emo.color_name)}
                      </label>
                      <ul>
                        {allTag
                          ?.filter((tag) => rec.tags.includes(tag.tag_id))
                          .map((tag, index) => (
                            <li key={index}>{tag.tag}</li>
                          ))}
                      </ul>
                      <div className="flex gap-1">
                        <button
                          className="bg-white rounded-xl px-4"
                          onClick={() => handleDelete(rec._id)}
                        >
                          delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <span>สรุปผล</span>
                {selectRecords && (
                  <div className="flex flex-row">
                    <div className="flex justify-center items-center w-36 h-36 rounded-full">
                      <GradientColor size={36} filteredRecord={selectRecords} />
                    </div>
                    <ul className="flex flex-col">
                      {countEmotions.map((cemo, index) => (
                        <li key={index} className="flex">
                          <label>{cemo.count}</label>
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
