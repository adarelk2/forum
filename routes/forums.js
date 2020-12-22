var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var mongo = require("../dbs_connected/mongo_connected");
var User = require("../class/User");
const config = require('../configs');
const {authToken} = require('../middleware/auth');
const Forum = require('../class/Forum');

router.get("/getForums",async(req,res)=>{
  let forum = new Forum();
  let getListOfForums = await forum.getListForums();
   res.status(getListOfForums.status).json(getListOfForums);
});

router.post("/create",authToken,async(req,res)=>{
   let forum = new Forum();
   let topic = await forum.createTopic(req.body.id,req.id,req.body.subject,req.body.title);
    res.status(topic.status).json({resp:topic});
 });

 router.post("/insertComment",authToken,async(req,res)=>{
   let forum = new Forum();
   let comment = await forum.insertComment(req.body.id,req.id,req.body.subject,req.body.title);
    res.status(comment.status).json(comment);
 });

 router.get("/getTopic",async(req,res)=>{
   let token = req.header("x-auth-token");
   try{
      req.id = null;
      if(token)
      {
      let checkToken = jwt.verify(token,config.salt);
      req.id = checkToken.id;
      }
      let forum = new Forum();
      let topic = await forum.getTopicById(req.id,req.query.id);
       res.status(topic.status).json(topic);
    }
    catch(err){
      return res.status(config.status.badRequest).json({msg:err.message,state:false})
    }


 });
module.exports = router;
