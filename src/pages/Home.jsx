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
                <div className="mt-36 mb-5 ml-20">
                     <Quote></Quote>                     
                </div>
            </div>
            <EmotionsCardPanel></EmotionsCardPanel>
            <div className="mt-20 mb-20">
                 <Inscontent></Inscontent>                
            </div>
    </>
  );
}

export default Home;
