import React from "react";
import { useNavigate } from "react-router-dom";
export const ForgottenPassword = () => {
  const navigate = useNavigate();
  return (
    <form className="flex flex-col h-full">
      <div>
        <h1 className="pb-5 pt-10 text-3xl">ลืมรหัสผ่าน</h1>
      </div>
      <div className="flex flex-col place-items-center">
        <h2 className="pb-5 text-xl">
          กรุณาระบุอีเมลของคุณและเราจะส่งลิงห์เพื่อให้คุณรีเซ็ตรหัสผ่าน
        </h2>
        <div className="flex flex-col pb-2 w-4/6">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-800 rounded-s-3xl bg-gray-200">
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
              className="rounded-e-3xl p-3 bg-gray-200 w-full focus:outline-none "
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
      </div>
    </form>
  );
};
