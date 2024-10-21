import React from "react";
import NavigationBar from "../Navbar/Navbar";
import "./Homescreen.css";
import { useSelector } from "react-redux";

const Homescreen = () => {
  const { username } = useSelector((state) => state.user_detail);
  return (
    <div className="homescreen">
      <NavigationBar />
      <div className="homescreen_main">
        <h2>Homescreen</h2>
        <p>Access token : {sessionStorage.getItem("access_token")}</p>
      </div>
    </div>
  );
};

export default Homescreen;
