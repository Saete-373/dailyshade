import { useState, useEffect, useContext, createContext } from "react";
import { useSelector } from "react-redux";
import api from "../axios";
import Quote from "../components/quote";
import Calendar from "../components/calendar";
import EmotionsCardPanel from "../components/EmotionsCardPanel";
import Inscontent from "../components/insContent";
import GototopBtn from "../components/gototopBtn";
import { FileInput } from "flowbite-react";
import { Bubble } from "../components/bubble";
import lock from "../assets/3d-lock.png";

const getUser = (state) => ({ ...state.user });

function Home() {
  const user = useSelector(getUser);
  const [userEmail, setUserEmail] = useState();
  const [sDay, setSDay] = useState();

  useEffect(() => {
    setUserEmail(user.email);
  }, [user]);

  return (
    <>
      <section id="section1" className="h-screen bg-home">
        <aside className="relative flex  max-w-screen  ">
          <div className="mt-40 ml-20 ssm:ml-5 max-w-xl w-xl">
            <Quote></Quote>
          </div>
          {/* <div className="absolute -z-10 right-0">
              <Bubble />
            </div> */}
        </aside>
      </section>

      <div className="relative">
        {user.email ? (
          <section id="section2">
            <Calendar sDay={setSDay} />
          </section>
        ) : (
          <>
            <section id="section2" className="blur-sm">
              <Calendar sDay={setSDay} />
            </section>
            <div className="absolute flex flex-col top-0 left-0 w-full h-full z-50 items-center justify-center pointer-events-none gap-y-5">
              <img src={lock} alt="" className="w-20 h-20" />
              <div className="bg-base-pink text-text-color p-2 px-3 rounded-full pointer-events-auto">
                กรุณาเข้าสู่ระบบก่อนเริ่มบันทึก
              </div>
            </div>
          </>
        )}
      </div>

      <section id="section3">
        <article>
          <EmotionsCardPanel></EmotionsCardPanel>
        </article>
      </section>
      <section id="section4" className="mt-20 mb-20">
        <Inscontent></Inscontent>
      </section>
    </>
  );
}

export default Home;
