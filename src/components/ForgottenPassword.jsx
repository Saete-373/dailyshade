import React from "react";
import { useNavigate } from "react-router-dom";
export const ForgottenPassword = () => {
  const navigate = useNavigate();
  return (
    <form className="flex flex-col justify-between h-full">
      <div>
        <h1 className="pb-5 pt-10 text-3xl">ลืมรหัสผ่าน</h1>
      </div>
      <div className="flex flex-col place-items-center">
        <h2 className="pb-5 text-xl">กรุณาระบุที่อยู่อีเมลของท่าน</h2>
        <div className="flex flex-col pb-2 w-4/6">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-800 rounded-s-3xl bg-white/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              className="rounded-e-3xl p-3 bg-white/40 w-full focus:outline-none "
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-10">
        <div className="w-4/6 flex justify-between">
          <button
            type="submit"
            className="inline-flex items-center justify-start rounded-3xl text-text-color transition-all duration-250 mt-2 hover:underline underline-offset-4"
          >
            ไม่ได้รับอีเมล?
          </button>
          <div className="flex flex-row gap-x-1">
            <button
              onClick={() => {
                navigate("/");
              }}
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl bg-stone-300 py-3 text-text-color shadow-sm transition-all duration-250 hover:bg-stone-400 mt-2 px-10"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl bg-base-pink py-3 text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker mt-2 px-10"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
