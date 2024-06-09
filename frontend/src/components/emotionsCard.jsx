import React from "react";
import { useState, useEffect } from "react";
import angry from "../assets/E1_Angry.png";
import disgusted from "../assets/E2_Disgusted.png";
import sad from "../assets/E3_Sad.png";
import happy from "../assets/E4_Happy.png";
import surprise from "../assets/E5_Surprise.png";
import bad from "../assets/E6_Bad.png";
import fearful from "../assets/E7_Fearful.png";
import "./styles/myCSS.css";

function EmotionsCard() {
  const [isMoving, setMoving] = useState(true);
  const emotions = [
    {
      image: happy,
      name: "Happiness",
      description:
        "ภาวะที่เราพึงพอใจ เพลิดเพลินกับบางสิ่งและเป็นสัญญาณของการมีสุขภาวะที่ดี",
    },

    {
      image: surprise,
      name: "Surprise",
      description:
        "เป็นอารมณ์ได้ทั้งทางบวก ทางลบ หรือกลาง ๆ ซึ่งเป็นอารมณ์ที่ตอบสนองต่อสิ่งที่ไม่คาดคิด",
    },
    {
      image: sad,
      name: "Sadness",
      description:
        "สภาวะของการรู้สึกผิดหวัง เสียใจ สิ้นหวัง รวมถึงอารมณ์หน่วง ๆ ที่ยากจะควบคุม",
    },
    {
      image: bad,
      name: "Bad",
      description:
        "ความรู้สึกที่มองว่าสิ่งที่ตัวเองกระทำออกไปหรือสิ่งที่ได้รับเป็นเรื่องไม่สมควร ทำให้เกิดความเสียหายทางจิตใจหรือทางร่างกาย",
    },
    {
      image: angry,
      name: "Angry",
      description:
        "ความรู้สึกหรือความคิดเชิงลบที่อาจมีการแสดงพฤติกรรมต่าง ๆ เพื่อตอบสนองต่อสิ่งเหตุการณ์ที่เกิดขึ้น",
    },
    {
      image: fearful,
      name: "Fear",
      description:
        "อารมณ์ที่สำคัญในการอยู่รอดของมนุษย์ ความกลัวจะทำให้เราตระหนักและรับรู้ว่าเกิดอันตรายขึ้นและต้องรับมือกับมัน",
    },
    {
      image: disgusted,
      name: "Disgust",
      description:
        "เกิดจากการรับรู้ผ่านประสาทสัมผัสซึ่งอาจเกิดการแสดงออกทางร่างกาย",
    },
  ];
  const cards = Array.from(document.querySelectorAll(".card"));

  const handleMouseMove = (event) => {
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  useEffect(() => {
    if (!isMoving) return;
    const timeout = setTimeout(() => setMoving(false), 1000);
    return () => clearTimeout(timeout);
  }, [isMoving]);

  useEffect(() => {
    const cardsContainer = document.getElementById("cards");
    cardsContainer.addEventListener("mousemove", handleMouseMove);
    return () =>
      cardsContainer.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        id="cards"
        className="flex gap-5 flex-wrap m-7 justify-center ipad:flex ipad:flex-row ipad:flex-nowrap ipad:pl-20 ipad:pr-20 ipad:gap-x-10 "
      >
        {emotions.map((emotion, index) => (
          <div
            key={index}
            className="card flex flex-col justify-centent-center rounded-lg border-2 border-snow py-6 px-2 max-w-56 w-56 ipad:flex ipad:snap-always ipad:snap-center "
          >
            <div className="flex justify-center pb-2">
              <img
                src={emotion.image}
                className="rounded-full max-w-52 w-20"
              ></img>
            </div>
            <h2
              className="text-xl font-normal text-neutral-800 uppercase pb-1"
              id="emotionName"
            >
              {emotion.name}
            </h2>
            <p
              id="emotionDescription"
              className="text-pretty leading-relaxed px-2 text-base"
            >
              {emotion.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
export default EmotionsCard;
