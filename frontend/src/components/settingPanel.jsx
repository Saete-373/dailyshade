import React, { useEffect } from "react";
import EditProfile from "./editProfile";
import ChangePassword from "./changePass";
import DeleteAccount from "./DeleteAccount";

function SettingPanel() {
  useEffect(() => {
    const handleTabClick = (e) => {
      const link = e.currentTarget.getAttribute("tab-to");
      const active_content = document.querySelector("#tab-contents .active");
      const tab_el = document.querySelector(
        '#tab-contents [tab-id="' + link + '"]'
      );
      const active_tab = document.querySelector("#tabs .active");

      active_content.classList.remove("active");
      active_content.classList.add("hidden");

      tab_el.classList.remove("hidden");
      tab_el.classList.add("active");
      active_tab.classList.remove(
        "active",
        "border-t",
        "border-l",
        "border-r",
        "bg-gray-300"
      );
      e.currentTarget.classList.add(
        "active",
        "border-t",
        "border-l",
        "border-r",
        "bg-gray-300"
      );
    };

    const tabItems = document.querySelectorAll("#tabs [tab-to]");
    tabItems.forEach((item) => {
      item.addEventListener("click", handleTabClick);
    });

    // Cleanup event listeners on component unmount
    return () => {
      tabItems.forEach((item) => {
        item.removeEventListener("click", handleTabClick);
      });
    };
  }, []);

  return (
    <div className="flex max-w-screen justify-center">
      <div className="flex flex-row justify-center w-9/12 max-h-full h-screen place-items-center">
        <div className="card-shadow w-1/4 max-h-screen h-5/6  rounded-l-xl gap-5 bg-snow z-10">
          <div className="flex flex-col pt-12 text-left h-4/5">
            <h1 className="pb-6 text-2xl pl-14">การตั้งค่า</h1>
            <ul id="tabs">
              <li
                className="flex rounded hover:bg-gray-300 p-14 max-w-full pb-4 pt-4 active border-t border-l border-r bg-gray-300"
                tab-to="first"
                id="active"
              >
                <button>
                  <label className="inline-flex items-center w-full space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="cursor-pointer">แก้ไขข้อมูล</span>
                  </label>
                </button>
              </li>
              <li
                className="flex rounded hover:bg-gray-300 p-14 max-w-full pb-4 pt-4"
                tab-to="second"
              >
                <button>
                  <label className="inline-flex items-center w-full space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <span className="cursor-pointer">เปลี่ยนรหัสผ่าน</span>
                  </label>
                </button>
              </li>
              <li
                className="flex rounded hover:bg-gray-300 p-14 max-w-full pb-4 pt-4"
                tab-to="third"
              >
                <button>
                  <label className="inline-flex items-center w-full space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="cursor-pointer">ลบบัญชี</span>
                  </label>
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col text-left h-1/5 place-content-end">
            <ul className="leading-loose">
              <li className="flex rounded hover:bg-gray-300 p-14 max-w-full pb-8 pt-8">
                <button>
                  <label className="inline-flex items-center w-full space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 shake "
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="cursor-pointer text-red-600">
                      ออกจากระบบ
                    </span>
                  </label>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="card-shadow w-3/4 max-h-screen h-5/6 rounded-e-xl gap-5 bg-steel "
          id="tab-contents"
        >
          <div className="active" tab-id="first">
            <EditProfile />
          </div>
          <div className=" hidden" tab-id="second">
            <ChangePassword />
          </div>
          <div className=" hidden" tab-id="third">
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPanel;
