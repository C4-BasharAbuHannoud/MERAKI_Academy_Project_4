import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { AiFillFacebook, AiFillHome } from "react-icons/ai";
import { FaSistrix } from "react-icons/fa";
//BsBoxArrowRight
import { BsBoxArrowRight } from "react-icons/bs";

const Navigation = ({ setToken, myId, allUsersSearch }) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="logo_search">
        <div className="logo">
          <AiFillFacebook
            className="facebook"
            onClick={(e) => {
              navigate(`/Home/${myId}`);
            }}
          />
        </div>
        <div className="search">
          <FaSistrix
            className="icont_seacrh"
            onClick={(e) => {
              allUsersSearch.find((element, i) => {
                if (
                  search.toLocaleLowerCase() ==
                  element.userName.toLocaleLowerCase()
                ) {
                  navigate(`/profile/${element._id}`);
                  setSearch("");
                }
              });
            }}
          />
          <input
            className="input_search"
            type="text"
            placeholder="Search friends"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="home_nav">
        <Link to={`/Home/${myId}`}>
          <AiFillHome className="home_icon" />
        </Link>
      </div>

      <div>
        {allUsersSearch &&
          allUsersSearch.map((el, i) =>
            el._id == myId ? (
              <div className="nav_account">
                <div>
                  <img className="imge_account" src={el.image} />
                </div>
                <Link className="linkAccount" to={`/profile/${el._id}`}>
                  <div className="userName_for_homePage">{el.userName}</div>
                </Link>
              </div>
            ) : (
              <></>
            )
          )}
      </div>
      <div className="style_logOut">
        <BsBoxArrowRight className="icone_left" />
        <button
          className="LogOut"
          onClick={(e) => {
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
