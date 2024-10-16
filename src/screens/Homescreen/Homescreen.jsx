import React from "react";
import NavigationBar from "../Navbar/Navbar";
import "./Homescreen.css";
import { useSelector } from "react-redux";

const Homescreen = () => {
  const { accessToken, refreshToken } = useSelector(
    (state) => state.user_detail
  );
  return (
    <div className="homescreen">
      <NavigationBar />
      <div className="homescreen_main">
        <h2>Homescreen</h2>
        <h3>Access token : {accessToken}</h3>
        <h3>Refresh token : {refreshToken}</h3>
      </div>
    </div>
  );
};

export default Homescreen;
