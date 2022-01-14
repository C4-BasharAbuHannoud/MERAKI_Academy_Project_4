
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
const Navigation = ({setToken,myId}) => {
 
 
  const navigate = useNavigate();

 
  return (
    <div className="nav">
    <div className="logo_search">
      <div className="logo">Logo</div>
      <div className="search"></div>
    </div>

    <div className="home_nav">
      <Link to="/Home" className="linkreg">
       Home
        
      </Link>
    </div>

    <div>
      {" "}
      <Link className="linkreg" to={`/profile/${myId}`}>
        My Profile
      </Link>{" "}
    </div>
    <div>
    <button
      className="LogOut"
      onClick={(e) => {
        console.log("hi");
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
      }}
    >
      LogOut
    </button>
    </div>
  </div>
  );
};



export default Navigation;