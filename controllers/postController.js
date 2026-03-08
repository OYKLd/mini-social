const Post = require("../models/post");
const User = require("../models/User");

exports.createPost = async (req, res) => {

  try {

    const { author, content, tags } = req.body;

    const post = new Post({
      author,
      content,
      tags
    });

    await post.save();

    res.status(201).json(post);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.getPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate("author", "username");

    res.json(posts);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.likePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    post.likes.push(req.body.userId);

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.commentPost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    const comment = {
      user: req.body.userId,
      content: req.body.content
    };

    post.comments.push(comment);

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json(error);

  }

};

exports.getFeed = async (req, res) => {

 try {

  const user = await User.findById(req.params.userId);

  const posts = await Post.find({
   author: { $in: user.following }
  }).populate("author", "username");

  res.json(posts);

 } catch (error) {

  res.status(500).json(error);

 }

};

exports.recommendPosts = async (req, res) => {

 try {

  const user = await User.findById(req.params.userId);

  const posts = await Post.find({
   tags: { $in: user.interests }
  }).limit(10);

  res.json(posts);

 } catch (error) {

  res.status(500).json(error);

 }

};