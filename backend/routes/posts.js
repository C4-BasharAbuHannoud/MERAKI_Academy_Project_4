const express = require("express");

const { createNewPost,getAllPosts } = require("../controllers/posts");

// Create posts router
const postsRouter = express.Router();

postsRouter.post("/add", createNewPost);
postsRouter.get("/", getAllPosts);

module.exports = postsRouter;
