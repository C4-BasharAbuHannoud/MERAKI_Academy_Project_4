const express = require("express");

const { createNewPost,getAllPosts,getPostsByUserName } = require("../controllers/posts");

// Create posts router
const postsRouter = express.Router();

postsRouter.post("/add", createNewPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/:user", getPostsByUserName);

module.exports = postsRouter;
