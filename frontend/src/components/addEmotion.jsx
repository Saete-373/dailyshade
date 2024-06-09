import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import api from "../axios";
import { months } from "../../../backend/components/Calendar";
import { getDay } from "../../../backend/components/convertThaiDays";
import { SelectTag } from "../../../backend/components/selectTag";
import { TimePicker } from "antd";
import EmotionCircle from "./emotionCircle";
import { MomentaryBtn } from "./momentaryBtn";

const getUser = (state) => ({ ...state.user });

const AddEmotion = ({ toggleAdd, setToggleAdd, selectDate }) => {
  const user = useSelector(getUser);

  const currentDate = dayjs();

  const [selectTime, setSelectTime] = useState(currentDate);
  const [tags, setTags] = useState([]);
  const [selectColor, setselectColor] = useState("#888888");
  const [selectColorID, setSelectColorID] = useState("");

  const GetTags = async () => {
    await api
      .post("/getTagsByColor", {
        selected_color: selectColor,
      })
      .then((res) => {
        const filter_1tag = res.data.filter((tag) => tag.color_id.length == 1);
        const color_id = filter_1tag[0].color_id[0];
        const allTag = res.data.map((tag) => [tag, false]);
        setSelectColorID(color_id);
        setTags(allTag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectColor != "#888888") {
      GetTags();
    }
  }, [selectColor]);

  //   useEffect(() => {
  //     console.log(tags);
  //   }, [tags]);

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

    await api
      .post("/addRecord", {
        email: user.email,
        color_id: selectColorID,
        tag_ids: selectedTagIDs,
        datetime: newDateTime,
      })
      .then((res) => {
        console.log(res.data.log);
        setTags([]);
      })
      .catch((err) => {
        console.log(err);
      });
    setToggleAdd(false);
  };

  return (
    <>
      {toggleAdd ? (
        <form
          className="flex flex-col relative w-2/5 p-4 rounded-r-xl ipad:rounded-b-xl ipad:rounded-tr-none bg-white text-text-color min-ipad:px-16 ipad:w-full"
          onSubmit={HandleSubmit}
        >
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

          <p className="pb-5">ตอนนี้คุณรู้สึกอย่างไร?</p>
          <div className="flex justify-center pb-5">
            <EmotionCircle
              selectColor={selectColor}
              setselectColor={setselectColor}
            />
          </div>
          <div>
            {selectColor === "#888888" ? null : (
              <div className="pb-5">
                <p className="pb-3">
                  คำที่สามารถอธิบายความรู้สึกของคุณได้ดีที่สุด
                </p>

                <ul className="flex flex-wrap row gap-2 max-h-40 overflow-y-auto">
                  {tags.map((tag, index) => (
                    <li
                      key={index}
                      className={
                        "border-base-pink border-2 px-5 rounded-2xl cursor-pointer " +
                        (tags[index][1]
                          ? "bg-base-pink border-pink-darker"
                          : "bg-white")
                      }
                      onClick={() => {
                        setTags(SelectTag(tags, index));
                      }}
                    >
                      {tag[0].tag}
                    </li>
                  ))}
                </ul>
                <button
                  type="submit"
                  className="z-99 inline-flex items-center justify-center rounded-3xl bg-base-pink mt-5 w-36 py-2 text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker cursor-pointer"
                >
                  บันทึก
                </button>
                <div className="pb-20">
                  <MomentaryBtn selectDate={selectDate} />
                </div>
              </div>
            )}
          </div>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddEmotion;
