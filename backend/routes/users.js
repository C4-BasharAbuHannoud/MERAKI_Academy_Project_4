const express = require("express");
const { createNewUser,getInfoUser ,updateImage,getAllUsers} = require("../controllers/users");
const { authentication } = require("../middleware/authentication");

//------- Define articlesRouter router----//
const usersRouter = express.Router();

usersRouter.post("/create", createNewUser);
usersRouter.get("/:info", getInfoUser);
usersRouter.put("/:image", updateImage);
usersRouter.get("/all/users", authentication,getAllUsers);


module.exports = usersRouter;
