import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Onboarding from "./screens/OnBoarding/Onboarding";
import Homescreen from "./screens/Homescreen/Homescreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/homescreen" element={<Homescreen />} />
      </Routes>
    </Router>
  );
};

export default App;
