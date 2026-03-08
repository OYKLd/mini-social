const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/:id/follow", userController.followUser);

module.exports = router;