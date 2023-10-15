// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainCrudContextProvider } from "./context/MainCrudContext";
import HomePage from "./components/HomePage";
import UserAuthentication from "./components/UserAuthentication";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <MainCrudContextProvider>
          <Routes>
            <Route exact path="/" element={<UserAuthentication />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </MainCrudContextProvider>
      </Router>
    </>
  );
}

export default App;
