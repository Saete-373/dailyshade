import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Quote from "../components/quote";
import Calendar from "../components/calendar";
import EmotionsCardPanel from "../components/EmotionsCardPanel";
import Inscontent from "../components/insContent";
import GototopBtn from "../components/gototopBtn";
import { FileInput } from "flowbite-react";
import { Bubble } from "../components/bubble";
export const EmailContext = createContext();

function Home() {
  const [isFindUser, setFindUser] = useState(true);
  const [userEmail, setUserEmail] = useState();
  const [sDay, setSDay] = useState();
  const [image, setImage] = useState();

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

  const getURL = (evt) => {
    var reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };

  axios.defaults.withCredentials = true;

  return (
    <>
      <EmailContext.Provider value={[userEmail, setUserEmail]}>
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
        {userEmail ? (
          <section id="section2">
            <Calendar sDay={setSDay} />
          </section>
        ) : (
          ""
        )}
        {/* <input type="file" id="fileInput" onChange={getURL}></input>
        <button onClick={getURL}>click me</button> */}
        <img src={image} />
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
