const express = require("express");

const { createNewPost } = require("../controllers/posts");

// Create posts router
const postsRouter = express.Router();

postsRouter.post("/add", createNewPost);

module.exports = postsRouter;
