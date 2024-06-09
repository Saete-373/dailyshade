import React from "react";

export const AddRecord = () => {
  return (
    <div>
      <button className=" p-2 rounded-full border-2 border-black border-dashed hover:scale-110 transition ease-in-out delay-150">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <div>
        <input type="time" />
      </div>
    </div>
  );
};
