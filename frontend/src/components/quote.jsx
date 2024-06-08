import React, { useEffect } from "react";
import Recordbtn from "./button";
function Quote() {
  const quotes = [
    {
      text: "If you want to live a happy life, tie it to a goal, not to people or things.",
      author: "Albert Einstein",
    },
    {
      text: "The best way to cheer yourself up is to cheer someone else up.",
      author: "Mark Twain",
    },
    {
      text: "There is only one happiness in this life: to love and be loved.",
      author: "George Sand",
    },
    {
      text: "Apologizing doesn't always mean you're wrong and the other person is right. It means you value your relationship more than your ego.",
      author: "Anonymous",
    },
    {
      text: "Emotion can be the enemy, if you give into your emotion, you lose yourself. You must be at one with your emotions, because the body always follows the mind.",
      author: "Bruce Lee",
    },

    {
      text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
      author: "Mother Teresa",
    },
    {
      text: "In the end, it's not the years in your life that count. It's the life in your years.",
      author: "Abraham Lincoln",
    },
    {
      text: "The most important decision you make is to be in a good mood.",
      author: "Voltaire",
    },
    {
      text: "One thing you can't hide - is when you're crippled inside.",
      author: "John Lennon",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      document.getElementById("quoteText").textContent = `"${quote.text}"`;
      document.getElementById("authorText").textContent = `— ${quote.author}`;
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className="flex">
        <div className="text-left">
          <p
            className="text-pretty quote-text text-3xl text-gray-700 mb-5 leading-relaxed font-serif"
            id="quoteText"
          >
            Your emotions are the slaves to your thoughts, and you are the slave
            to your emotions.
          </p>
          <p className="author-text text-xl text-gray-600 " id="authorText">
            —Elizabeth Gilbert
          </p>
          <p className="pb-8 text-left pt-10 text-xl">วันนี้เป็นอย่างไรบ้าง?</p>
          <div className="mb-36 w-2/4 ssm:w-2/4">
            <Recordbtn></Recordbtn>
          </div>
        </div>
      </aside>
    </>
  );
}
export default Quote;
