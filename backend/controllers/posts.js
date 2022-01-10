require("dotenv").config();
const postsModel = require("../database/models/postSchema");

//1-function to create post
const createNewPost = (req, res) => {
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

// 2 -function get all posts
const getAllPosts = (req, res) => {
  postsModel
    .find({})
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

//3- function to get Posts By UserName

const getPostsByUserName = (req, res) => {
  const user = req.params.user;

  postsModel
    .find({ user })
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `All the posts for ===> ${user}`,
        posts: result,
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, massage: "The user Not Found" });
    });
};

//function update post

const updatePostById = (req, res) => {
  const updateById = req.params.id;
  const { title, description, user } = req.body;

  postsModel
    .findOneAndUpdate({ _id: updateById }, req.body)
    .then((result) => {
      res.status(202).json({
        success: true,
        massage: `Success post updated`,
        article: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: `The post ==> ${updateById} Not Found`,
      });
    });
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostsByUserName,
  updatePostById,
};
