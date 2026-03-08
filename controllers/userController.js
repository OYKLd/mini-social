const User = require("../models/User");

exports.followUser = async (req, res) => {

 try {

  const userToFollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.body.userId);

  if (!userToFollow.followers.includes(req.body.userId)) {

   userToFollow.followers.push(req.body.userId);
   currentUser.following.push(req.params.id);

   await userToFollow.save();
   await currentUser.save();

   res.json("User followed");

  } else {

   res.status(400).json("Already following");

  }

 } catch (error) {

  res.status(500).json(error);

 }

};