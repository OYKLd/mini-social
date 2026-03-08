const express = require("express");
const router = express.Router();


const postController = require("../controllers/postController");

router.post("/", postController.createPost);

router.get("/", postController.getPosts);

router.post("/:id/like", postController.likePost);

router.post("/:id/comment", postController.commentPost);

router.get("/feed/:userId", postController.getFeed);

router.get("/recommend/:userId", postController.recommendPosts);

module.exports = router;