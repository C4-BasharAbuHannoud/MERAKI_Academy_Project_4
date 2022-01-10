const express = require("express");

const { createNewPost,getAllPosts,getPostsByUserName,updatePostById,deletePostById } = require("../controllers/posts");

// Create posts router
const postsRouter = express.Router();

postsRouter.post("/add", createNewPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/:user", getPostsByUserName);
postsRouter.put("/:id", updatePostById);
postsRouter.delete("/:id", deletePostById);

module.exports = postsRouter;
