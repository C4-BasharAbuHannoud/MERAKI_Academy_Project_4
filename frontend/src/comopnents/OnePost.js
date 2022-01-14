import axios from "axios";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OnePost= ()=>{

    const { _id } = useParams();
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
       getOnePost();
      }, [_id]);

    const getOnePost =  () => {
         axios
          .get(`http://localhost:5000/posts/${_id}/post`,
         
         )
          .then((result) => {

            console.log("result data:", result.data);
            setPosts(result.data.posts);
            setUserId(result.data.userId);
          
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return(
        <div>Test</div>
    )
}
export default OnePost;