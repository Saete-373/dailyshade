import { useState } from 'react'
import {  BrowserRouter as Router,  Routes,  Route, BrowserRouter} from "react-router-dom";
import './App.css'
import './index.css'
import StickyNavbar from './components/navbar'
import Home from './pages/Home'

function App() {

  return (
    <>
    <BrowserRouter>
      <StickyNavbar></StickyNavbar>
        <Routes>
          <Route path='/' Component={Home}></Route>
        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
