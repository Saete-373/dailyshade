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
  const [email, setEmail] = useState();
  const [sDay , setSDay] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getUser")
      .then((res) => {
        // console.log(res.data);
        setEmail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="relative flex flex-col max-w-3xl">
        <div className="mt-36 mb-5 ml-20">
          <Quote></Quote>
        </div>
      </div>
      <Calendar sDay={setSDay} />
      <EmotionsCardPanel></EmotionsCardPanel>
      <div className="mt-20 mb-20">
        <Inscontent></Inscontent>
      </div>
    </>
  );
}

export default Home;
