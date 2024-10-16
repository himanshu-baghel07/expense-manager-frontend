import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Onboarding from "./screens/OnBoarding/Onboarding";
import Homescreen from "./screens/Homescreen/Homescreen";
import "bootstrap/dist/css/bootstrap.min.css";

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
