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
    {
      text: "Kindness isn’t weakness, but strength.",
      author: "Cinderella (2021)",
    },
    {
      text: "Just because someone stumbles and loses their path, doesn’t mean they’re lost forever.",
      author: "Professor X",
    },
    {
      text: "Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.",
      author: "Ferris Bueller",
    },
    {
      text: "Don’t let anyone ever make you feel like you don’t deserve what you want.",
      author: "Heath Ledger as Patrick Verona",
    },
    {
      text: "You cannot live your life to please others. The choice must be yours.",
      author: "White Queen",
    },
    {
      text: "It’s not destroying. It’s making something new.",
      author: "Natalie Portman as Lena",
    },
    {
      text: "Only if you find peace within yourself will you find true connection with others.",
      author: "Palm Reader",
    },
    {
      text: "When you decide to be something, you can be it.",
      author: "Frank Costello",
    },
    {
      text: "Fear is the mind-killer.",
      author: "Dune (2020)",
    },
    {
      text: "Life is like a box of chocolates, you never know what you’re gonna get.",
      author: "Forrest Gump (1994)",
    },
    {
      text: "It’s only after we’ve lost everything that we’re free to do anything.",
      author: "Fight Club (1999)",
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
