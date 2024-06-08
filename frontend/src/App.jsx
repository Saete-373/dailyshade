import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import api from "./axios";
import StickyNavbar from "./components/navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Momentary from "./pages/Momentary";
import Account from "./pages/Account";
import FogetPW from "./pages/FogetPW";
import Footer from "./components/footer";
import { Auth } from "./pages/Authen";
import { Verify } from "./pages/verify";

function App() {
  const dispatch = useDispatch()
  const currentUser = async (authtoken) => {
    await api
      .post(
        "/currentUser",
        {},
        {
          headers: {
            authtoken: authtoken,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: {
            token: authtoken,
            email: res.data.user.email,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const idToken = localStorage.token;
  if (idToken) {
    currentUser(idToken);
  }

  const router = createBrowserRouter([
    {
      path: "auth",
      element: <Auth />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "forgetpw",
      element: <FogetPW />,
    },
    {
      path: "account",
      element: (
        <>
          <StickyNavbar />
          <Account />
          <Footer />
        </>
      ),
    },
    {
      path: "momentary",
      element: (
        <>
          <StickyNavbar />
          <Momentary />
          <Footer />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <StickyNavbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/verify",
      element: (
        <>
          <Verify />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
