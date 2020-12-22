const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("../configs");
const jwt = require("jsonwebtoken");

const forumSchema = new mongoose.Schema({
  description: String,
  logo: String
});

const forumModel = mongoose.model("forums",forumSchema);
exports.forumModel = forumModel;

const subForumSchema = new mongoose.Schema({
  description: String,
  ForumID: String,
  color: String
});

const subForumModel = mongoose.model("sub_forums",subForumSchema);
exports.subForumModel = subForumModel;

const topicSchema = new mongoose.Schema({
  body: String,
  forumID: String,
  userID:String,
  status: Number
});

const topicModel = mongoose.model("topics",topicSchema);
exports.topicModel = topicModel;