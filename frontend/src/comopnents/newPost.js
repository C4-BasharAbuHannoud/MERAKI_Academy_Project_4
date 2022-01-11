import axios from "axios";
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const NewPost = ({ token }) => {
  const [description, setDescription] = useState();
  const [craetPostMessage, setcraetPostMessage] = useState("");
  return (
    <div className="big">
      <div className="caertPost">
        <div className="border_bottom">
          <div className="New">New Post</div>
        </div>

        <div className="border_bottom">
          <input
            type="text"
            className="post"
            placeholder="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button
          className="butt_craet"
          onClick={(e) => {
            axios
              .post(
                "http://localhost:5000/posts/add",
                {
                  description: description,
                },
                {
                  headers: {
                    Authorization: ` Bearer ${token}`,
                  },
                }
              )
              .then((result) => {
                console.log(result.data);
                e.target.style.background =
                  "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                e.target.style.color = "black";
                setcraetPostMessage(
                  "The post has been created successfully"
                );
              })
              .catch((err) => {
                e.target.style.background =
                  "linear-gradient(-45deg,#f7797d,#f7797d)";
                e.target.style.color = "black";
                setcraetPostMessage(
                  "Error happened while creating a new post, please try again"
                );
              });
          }}
        >
          Create New Post
        </button>
        <div className="messagReg">{craetPostMessage}</div>
      </div>
    
    </div>
  );
};

export default NewPost;
