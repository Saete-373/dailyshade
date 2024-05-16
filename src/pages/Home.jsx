import { useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../App";
import Quote from "../components/quote";
import Calendar from "../components/calendar";
import EmotionsCardPanel from "../components/EmotionsCardPanel";
import Inscontent from "../components/insContent";
import GototopBtn from "../components/gototopBtn";
function Home() {
  const [userEmail, setUserEmail] = useContext(EmailContext);
  const [sDay, setSDay] = useState();
  axios.defaults.withCredentials = true;

  return (
    <>
      <section id="section1" className="h-screen">
        <aside className="relative flex flex-col max-w-3xl">
          <div className="mt-60 ml-20 ssm:ml-5">
            <Quote></Quote>
          </div>
        </aside>
      </section>
      {userEmail ? (
        <section id="section2">
          <Calendar sDay={setSDay} user_email={userEmail} />
        </section>
      ) : (
        ""
      )}

      <section id="section3">
        <article>
          <EmotionsCardPanel></EmotionsCardPanel>
        </article>
      </section>
      <section className="mt-20 mb-20">
        <Inscontent></Inscontent>
      </section>
    </>
  );
}

export default Home;
