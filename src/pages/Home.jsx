import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Quote from "../components/quote";
import Recordbtn from "../components/button";
import Calendar from "../components/calendar";
import EmotionsCard from "../components/emotionsCard";
import EmotionsCardPanel from "../components/EmotionsCardPanel";
import Inscontent from "../components/insContent";
import GototopBtn from "../components/gototopBtn";
function Home() {
  const [userID, setUserID] = useState("");
  const [sDay, setSDay] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUser")
      .then((res) => {
        // console.log(res.data);
        setUserID(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <GototopBtn />
      <section id="section1" className="h-screen">
        <aside className="relative flex flex-col max-w-3xl">
          <div className="mt-60 ml-20">
            <Quote></Quote>
          </div>
        </aside>
      </section>
      <section id="section2">
        <Calendar sDay={setSDay} user_id={userID} />
      </section>
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
