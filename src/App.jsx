import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import StickyNavbar from "./components/navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Momentary from "./pages/Momentary";
import Account from "./pages/Account";

function App() {
  const router = createBrowserRouter([
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "forgetpw",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <>
          <StickyNavbar />
          <Home />
        </>
      ),
      children: [
        {
          path: "/",
          element: <StickyNavbar />,
        },
        {
          path: "momentary",
          element: <Momentary />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

//Customer route
// {
//   path: 'customer',
//   element: <Navbar />,
//   children: [{
//           path: 'main',
//           element: <CustomerMain />
//       },{
//           path: 'status',
//           element: <StatusBar firstpage={'รอยืนยัน'} secondpage={'กำลังทำ'} thirdpage={'ให้คะแนน'} />,
//           children: [{
//                   path: 'wait',
//                   element: <UserStatusWait />
//               },{
//                   path: 'work',
//                   element: <UserStatusWork />
//               },{
//                   path: 'end',
//                   element: <UserStatusRating />
//               }]
//       },{
//           path: 'profile',
//           element: <UserProfile />
//       },{
//           path: 'profile/edit',
//           element: <UserProfileEdit />
//       },{
//           path: 'maids/profile/:id',
//           element: <UserOtherProfile />
//       },{
//           path: 'maids/profile/:id/employ',
//           element: <UserMaidEmploy />
//       }
//   ]
// }
