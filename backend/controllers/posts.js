require("dotenv").config();
const postsModel = require("../database/models/postSchema");
const commenstModel = require("../database/models/commentsSchema");

//1-function to create post
const createNewPost = (req, res) => {

    const post_Id = req.params.post_Id;
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

//4-function update post

const updatePostById = (req, res) => {
  const postId = req.params.id;
  const { title, description, user } = req.body;

  postsModel
    .findByIdAndUpdate(postId, req.body, { new: true })
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

//5- create func to delte  post by id
const deletePostById = (req, res) => {
  const idPost = req.params.id;

  postsModel
    .findByIdAndDelete({ _id: idPost })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          massage: `The post  ==> ${idPost} Not Found`,
        });
      }

      res.status(200).json({
        success: true,
        massage: `Success Delete post With id ==> ${idPost}`,
      });
    })
    .catch((err) => {
      throw err;
    });
};

//6-create function to delete all posts for user

const deletePostByUserId = (req, res) => {
  const { user } = req.body;

  postsModel
    .deleteMany({ user })
    .then((result) => {
      if (!result.deletedCount) {
        res.status(404).json({
          success: false,
          massage: `No posts for this user ==> ${user}`,
        });
      }

      res.status(200).json({
        success: true,
        massage: `Succeeded to delete all the posts for the user ⇾${user}`,
        article: result,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};


module.exports = {
  createNewPost,
  getAllPosts,
  getPostsByUserName,
  updatePostById,
  deletePostById,
  deletePostByUserId,
 
};
