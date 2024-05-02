import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Quote from "../components/quote";
import Recordbtn from "../components/button";
import Calendar from "../components/calendar";
import EmotionsCard from "../components/emotionsCard";
import EmotionsCardPanel from "../components/EmotionsCardPanel";
import Inscontent from "../components/insContent";

function Home() {
  const [userID, setUserID] = useState("");
  const [sDay, setSDay] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/getUser")
    //   .then((res) => {
    //     // console.log(res.data);
    //     setUserID(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get("http://localhost:5000/test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <aside className="relative flex flex-col max-w-3xl">
        <div className="mt-36 mb-5 ml-20">
          <Quote></Quote>
        </div>
      </aside>
      <Calendar sDay={setSDay} user_id={userID} />
      <article>
        <EmotionsCardPanel></EmotionsCardPanel>
      </article>
      <section className="mt-20 mb-20">
        <Inscontent></Inscontent>
      </section>
    </>
  );
}

export default Home;
