import React from "react";

export const ResetPass = () => {
  return (
    <form className="flex flex-col place-items-center h-full">
      <div>
        <h1 className="pb-5 pt-10 text-3xl">เปลี่ยนรหัสผ่าน</h1>
      </div>
      <div className="flex flex-col  w-4/6 ">
        <label className="text-left">รหัสผ่านใหม่</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-800  rounded-s-3xl bg-white/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="password"
            name="password"
            className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none"
          />
        </div>
        <label className="text-left">ยืนยันรหัสผ่าน</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-800 rounded-s-3xl bg-white/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </span>
          <input
            type="password"
            name="cpassword"
            className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none"
          />
        </div>
        <div className="flex justify-center pt-5 pb-10 w-full">
          <button
            type="submit"
            className="inline-flex items-center w-full justify-center rounded-3xl bg-base-pink py-3 text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker  px-10 "
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </form>
  );
};
