import React, { useState, useEffect } from "react";
import api from "../axios";
import Recordbtn from "./button";
import { toast } from "react-toastify";

function Quote() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({});

  const fetchQuotes = async () => {
    await api
      .get("/getQuote")
      .then((res) => {
        setQuotes(res.data.quotes);
        setQuote(res.data.quotes[0]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.log);
      });
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    // console.log(quotes);
    if (quotes.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quotes?.length);
        const quote_rand = quotes[randomIndex];

        setQuote(quote_rand);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [quotes]);

  return (
    <>
      <aside className="flex">
        <div className="text-left flex flex-col">
          <p
            className="text-pretty quote-text text-3xl text-gray-700 mb-5 leading-relaxed font-serif"
            id="quoteText"
          >
            {quote?.text}
          </p>
          <p className="author-text text-xl text-gray-600 " id="authorText">
            —{quote?.author}
          </p>
          <p className="pb-8 text-left pt-10 text-xl">วันนี้เป็นอย่างไรบ้าง?</p>
          <div className="mb-36 w-3/4 ssm:w-3/4">
            <Recordbtn></Recordbtn>
          </div>
        </div>
      </aside>
    </>
  );
}
export default Quote;
