import { useState, useEffect } from "react";
import axios from "axios";
import Quote from "../components/quote";
import Recordbtn from "../components/button";
import EmotionsCard from "../components/emotionsCard";
import EmotionsCardPanel from "../components/EmotionsCardPanel";

function Home() {
  const [email, setEmail] = useState();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getUser")
      .then((res) => {
        console.log(res.data);
        setEmail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logOut = () => {
    axios
      .get("http://localhost:5000/api/logout")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={logOut}>Log Out</button>
      <div className="relative flex flex-col max-w-3xl">
        <div>
          <Quote></Quote>
        </div>
        <div>
          <Recordbtn></Recordbtn>
        </div>
      </div>
      <EmotionsCardPanel></EmotionsCardPanel>
    </>
  );
}

export default Home;
