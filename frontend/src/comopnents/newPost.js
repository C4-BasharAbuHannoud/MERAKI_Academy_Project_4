import axios from "axios";
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const NewPost = ({ token }) => {
  const [description, setDescription] = useState();
  const [craetPostMessage, setcraetPostMessage] = useState("");
  return (
  <div className="page_create_post">
      <div className="caertPost">
        <div className="line_title">
         
          <div className="title_new_post">Create post</div>
          <div className="line_creatpost"></div>
        </div>

        <div className="body_create">
          <input
            type="text"
            className="input_create_post"
            placeholder="Whats on your Mind ?"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div>
        <button
          className="button_craet_post"
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
                
                
                console.log("soso",result.data);
                console.log("momo",result.data.posts.description);

            

              e.target.style.background =
              "linear-gradient(-45deg,#CAC531,#F3F9A7)";
            e.target.style.color = "black";
            setcraetPostMessage("The post has been created successfully");
             
               
            
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
           Post
        </button>
        </div>
        <div className="messagReg">{craetPostMessage}</div>
      </div>
      </div>
  );
};

export default NewPost;
