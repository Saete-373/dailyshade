import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import happy from "../assets/E4_Happy.png";
import api from "../axios";

const getUser = (state) => ({ ...state.user });

function EditProfile() {
  const user = useSelector(getUser);
  const [oldUsername, setOldUsername] = useState();
  const [userData, setUserData] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    GetUserData();
  }, [user.email]);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  const GetUserData = async () => {
    if (user.email)
      await api
        .post("/getUserData", {
          email: user.email,
        })
        .then((res) => {
          setUserData(res.data);
          setOldUsername(res.data.username);
          setImage(res.data.user_pic);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.log);
        });
  };

  const updateProfile = async (_username) => {
    await api
      .put(
        "/updateProfile",
        {
          username: _username,
          user_pic: image,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.log);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.log);
      });
  };

  // const uploadedImage = React.useRef(null);

  const handleUsername = (evt) => {
    const value = evt.target.value;
    setUserData((prev) => ({ ...prev, ["username"]: value }));
  };

  const uploadImage = async (_fileImage) => {
    const formData = new FormData();
    formData.append("image", _fileImage);
    await api
      .post("/uploadProfile", formData, {
        headers: {
          authtoken: user.token,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then((res) => {
        setImage(res.data.imageName);
        setUserData((prev) => ({ ...prev, ["user_pic"]: res.data.imageName }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0] !== undefined) {
      const file = e.target.files[0];
      uploadImage(file);
    }
  };

  // const handleImageUpload = (e) => {
  //   const [file] = e.target.files;
  //   if (file) {
  //     const reader = new FileReader();
  //     const { current } = uploadedImage;
  //     current.file = file;
  //     reader.onload = (e) => {
  //       current.src = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const uploadImage = async (_fileImage) => {
  //   const formData = new FormData();
  //   formData.append("image", _fileImage);
  //   formData.append("token", window.localStorage.getItem("authtoken"));
  //   await api
  //     .post("/api/v1/account/uploadImage", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data", // Important for file uploads
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.success)
  //         setUser({ ...user, ["user_pic"]: res.data.imageName });
  //     });
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   uploadImage(file);
  // };

  // onChange={handleImageChange}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isOld = userData.username === oldUsername;

    if (isOld) {
      updateProfile(oldUsername);
    } else {
      updateProfile(userData.username);
    }
  };

  return (
    <>
      <h2 className="pt-12 text-xl pl-10 text-left">แก้ไขข้อมูลส่วนตัว</h2>
      <form onSubmit={handleSubmit}>
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
                  value={userData ? userData.username : "johndoe123"}
                  placeholder="ชื่อผู้ใช้"
                  className="rounded-e-full p-3 border-none bg-gray-200  w-full placeholder-gray-500"
                  onChange={handleUsername}
                />
              </div>
            </div>
          </div>

          <div className="w-2/5 flex flex-col justify-center place-items-center">
            <div>
              <img
                className="h-36 w-36 object-cover rounded-full border-4 border-base-pink"
                src={
                  image !== "" && image != undefined
                    ? "../../public/imageGalleries/" + image
                    : happy
                }
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
                // onChange={handleImageUpload}
                onChange={handleImageChange}
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
