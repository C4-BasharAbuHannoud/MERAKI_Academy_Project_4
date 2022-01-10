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
      postsModel.updateOne(
        { _id: postId },
        { $push: { comments: result._id} }).then(() => {
            res.status(201).json({
              success: true,
              message: `The new comment added`,
              comment: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: `something went wrong while adding a new comment`,
            });
          })
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
        });
      });
  };
           
module.exports = {
  createNewComment,
};
