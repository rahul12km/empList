/*eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Empinfo from "./Pages/Empinfo";
import Dashboard from "./Pages/Dashboard";
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/empinfo" element={<Empinfo/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
 </>
  )
}

export default App
