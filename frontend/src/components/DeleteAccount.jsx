import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <h2 className="pt-12 text-xl pl-10 text-left">ลบบัญชี</h2>
      <form>
        <div className="flex max-w-full justify-start place-content-center gap-10 p-10">
          <div className="w-3/5">
            <p className="text-left">
              If you delete your account, you won’t be able to log in with it
              anymore.
            </p>
          </div>
        </div>
        <div className=" w-3/5 px-10">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className=" inline-flex items-center justify-center rounded-xl bg-red-600 px-12 py-3 text-sm  text-white shadow-sm transition-all duration-250 hover:bg-pink-darker w-full"
          >
            ดำเนินการต่อ
          </button>
        </div>
        <DeleteModal
          trigger={showModal}
          setTrigger={setShowModal}
        ></DeleteModal>
      </form>
    </>
  );
}

export default DeleteAccount;
