const express = require("express");
const { createNewComment } = require("../controllers/comments");
const {
  createNewPost,
  getAllPosts,
  getPostsByUserName,
  updatePostById,
  deletePostById,
  deletePostByUserId,
  getPostById,
  
} = require("../controllers/posts");

const {authentication}=require("../middleware/authentication")

// Create posts router
const postsRouter = express.Router();

postsRouter.post("/add", authentication,createNewPost);

postsRouter.get("/", getAllPosts);
postsRouter.get("/:user", getPostsByUserName);
postsRouter.get("/:id/post", getPostById); 

postsRouter.put("/:id", updatePostById);
postsRouter.delete("/:id", deletePostById);
postsRouter.delete("/", deletePostByUserId);
postsRouter.post("/:post_id/comments", authentication,createNewComment);

module.exports = postsRouter;
