const Post = require("../models/post");

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