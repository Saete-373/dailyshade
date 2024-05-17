import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Quote from "../components/quote";
import Calendar from "../components/calendar";
import EmotionsCardPanel from "../components/EmotionsCardPanel";
import Inscontent from "../components/insContent";
import GototopBtn from "../components/gototopBtn";
import { FileInput } from "flowbite-react";

export const EmailContext = createContext();

function Home() {
  const [isFindUser, setFindUser] = useState(true);
  const [userEmail, setUserEmail] = useState();
  const [sDay, setSDay] = useState();

  useEffect(() => {
    if (isFindUser) {
      axios
        .get("http://localhost:5000/user/getUser")
        .then((res) => {
          if (res.data.isLogin) setUserEmail(res.data.email);
          setFindUser(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  axios.defaults.withCredentials = true;

  return (
    <>
      <EmailContext.Provider value={[userEmail, setUserEmail]}>
        <GototopBtn />
        <section id="section1" className="h-screen">
          <aside className="relative flex flex-col max-w-3xl">
            <div className="mt-60 ml-20 ssm:ml-5">
              <Quote></Quote>
            </div>
          </aside>
        </section>
        {userEmail ? (
          <section id="section2">
            <Calendar sDay={setSDay} />
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
      </EmailContext.Provider>
    </>
  );
}

export default Home;
