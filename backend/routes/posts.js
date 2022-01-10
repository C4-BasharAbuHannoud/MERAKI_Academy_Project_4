const express = require("express");

const { createNewPost,getAllPosts,getPostsByUserName,updatePostById,deletePostById,deletePostByUserId } = require("../controllers/posts");

// Create posts router
const postsRouter = express.Router();

postsRouter.post("/add", createNewPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/:user", getPostsByUserName);
postsRouter.put("/:id", updatePostById);
postsRouter.delete("/:id", deletePostById);
postsRouter.delete("/", deletePostByUserId);

module.exports = postsRouter;
