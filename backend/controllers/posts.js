
require("dotenv").config();
const postsModel = require("../database/models/postSchema");

const createNewPost=(req,res)=>{

    const { title, description, user } = req.body;

    const newPost = new postsModel({
        title,
        description,
        user,
    });
  
    newPost
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          massage: "Success post created",
          posts: result,
        });
      })
      .catch((err) => {
        res.status(500).json({ success: false, massage: "server error" });
      });
  };


  // 2 - get all posts
  const getAllPosts=(req,res)=>{
      
    postsModel.find({})
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "All the posts",
        posts: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false, massage: "server error" });
    });
};
  

  module.exports = {
    createNewPost,getAllPosts
  };
  

 