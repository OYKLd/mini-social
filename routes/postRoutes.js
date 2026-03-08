const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/", postController.createPost);

router.get("/", postController.getPosts);

router.post("/:id/like", postController.likePost);

router.post("/:id/comment", postController.commentPost);

module.exports = router;