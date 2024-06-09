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
          <div className="mt-56 ml-20 ssm:ml-5 max-w-xl w-xl">
            <Quote></Quote>
          </div>
          {/* <div className="absolute -z-10 right-0">
              <Bubble />
            </div> */}
        </aside>
      </section>

      <section id="section2">
        <Calendar sDay={setSDay} />
      </section>

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
