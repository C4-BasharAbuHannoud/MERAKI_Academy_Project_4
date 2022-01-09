const express = require("express");
const { createNewUser } = require("../controllers/users");

//------- Define articlesRouter router----//
const usersRouter = express.Router();

usersRouter.post("/create", createNewUser);

module.exports = usersRouter;
