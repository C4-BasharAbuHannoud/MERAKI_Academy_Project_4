require("dotenv").config();
const postsModel = require("../database/models/postSchema");
const commentsModel = require("../database/models/commentsSchema");
//6-function to create new comment for user

const createNewComment = (req, res) => {
    const postId = req.params.post_id;
    const { comment, commenter } = req.body;
  
    const newComment = new commentsModel({
      comment,
      commenter,
    });
  
    newComment
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: " The new comment added",
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
      });
    });
  };

  
  module.exports = {
    createNewComment,
  };
  