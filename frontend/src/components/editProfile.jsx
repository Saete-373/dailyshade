import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Recordbtn from "./button";
import png from "../assets/3.png";
import api from "../axios";

const getUser = (state) => ({ ...state.user });

function EditProfile() {
  const user = useSelector(getUser);

  const [userData, setUserData] = useState();

  useEffect(() => {
    GetUserData();
  }, [user.email]);

  const GetUserData = async () => {
    await api
      .post("/getUserData", {
        email: user.email,
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.log);
      });
  };

  const uploadedImage = React.useRef(null);
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <h2 className="pt-12 text-xl pl-10 text-left">แก้ไขข้อมูลส่วนตัว</h2>
      <form>
        <div className="flex max-w-full justify-center place-content-center gap-10 pt-10 px-10">
          <div className="w-3/5">
            <div className="flex flex-col pb-2">
              <label className="text-left">อีเมล</label>
              <div className="flex">
                <span className="inline-flex items-center p-3 text-sm text-gray-900 rounded-s-full border-none bg-gray-200">
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
                  disabled
                  placeholder={
                    userData ? userData.email : "johndoe123@gmail.com"
                  }
                  className="cursor-not-allowed rounded-e-full p-3 bg-gray-200 border-none w-full placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex flex-col pb-2">
              <label className="text-left">ชื่อผู้ใช้</label>
              <div className="flex">
                <span className="inline-flex items-center p-3 text-sm text-gray-900 bg-gray-200 rounded-s-full border-none ">
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
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  defaultValue={userData ? userData.username : "johndoe123"}
                  placeholder="ชื่อผู้ใช้"
                  className="rounded-e-full p-3 border-none bg-gray-200  w-full placeholder-gray-500"
                />
              </div>
            </div>
            {/* <div className="flex flex-col pb-2">
              <label className="text-left">วันเกิด</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white rounded-s-xl border-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="m15 1.784-.796.795a1.125 1.125 0 1 0 1.591 0L15 1.784ZM12 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L12 1.784ZM9 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L9 1.784ZM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 0 1 1.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 0 1 1.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 0 0-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 0 1 1.5 0v.797ZM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 0 1 2.585.364 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 2.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0 0 12 12.75ZM21.75 18.131a2.604 2.604 0 0 0-1.915.165 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.604 2.604 0 0 0-1.915-.165v2.494c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494Z" />
                  </svg>
                </span>
                <input
                  placeholder="Select date"
                  type="date"
                  className="rounded-e-xl p-2 border-none bg-white-100  w-full placeholder-gray-500"
                />
              </div>
            </div> */}
          </div>

          <div className="w-2/5 flex flex-col justify-center place-items-center">
            <div>
              <img
                ref={uploadedImage}
                className="h-36 w-36 object-cover rounded-full border-4 border-base-pink"
                src={png}
                alt="Current profile photo"
              />
            </div>
            <label className="block pt-5">
              <input
                type="file"
                className="w-32 text-sm text-slate-500 
                          file:mr-4 file:py-2 file:px-6
                          file:rounded-xl file:border-none file:bg-base-pink
                          file:text-sm file:font-light
                        file:text-text-color
                        hover:file:bg-pink-darker hover:file:cursor-pointer"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
        <div className=" w-3/5 px-10">
          <button
            type="submit"
            className="z-99 inline-flex items-center justify-center rounded-3xl bg-base-pink w-full py-3 text-sm  text-text-color shadow-sm transition-all duration-250 hover:bg-pink-darker cursor-pointer"
          >
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
