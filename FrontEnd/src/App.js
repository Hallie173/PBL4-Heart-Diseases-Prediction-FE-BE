import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import ECG from "./components/ECG/ECG";
import Footer from "./components/Footer";
import Heartrate from "./components/heartrate";
import History from "./components/history";
import MeasurePrepare from "./components/NewMeasure/MeasurePrepare";
import MeasureStart from "./components/NewMeasure/MeasureStart";
import Account from "./components/Manage/Account";
import Intro from "./components/Introduction/Intro";
import Manage from "./components/Manage/Manage";

function App() {
  return (
    <>
      <Router>
        <Routes> {/*user */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Heartrate />
                <Footer />
              </>
            }
          />
          <Route
            path="/history"
            element={
              <>
                <Navbar />
                <History />
                <Footer />
              </>
            }
          />
          <Route
            path="/account/*"
            element={
              <>
                <Navbar />
                <Account />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Routes> {/*admin*/}
          <Route
            path="/manage/*"
            element={
              <>
                <Manage />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
