const config = require("../configs");
const forumStatus = require("../forumStatus");
var { userModel } = require("../models/users_model");
var User = require("./User");
var { forumModel, subForumModel, topicModel } = require("../models/forums_model");
const NONE = 0;

class Forum extends User {
   constructor() {
      super();
   }

   async getListForums() {
      let ar = [];
      try {
         let forums = await forumModel.find({})
         let subForums = await subForumModel.find({})
         forums.map(forum => {
            let getSubForums = subForums.filter(item => {
               if (item._doc.forumID == forum.id) {
                  return true;
               }
            })
            forum._doc.sub = getSubForums;
            ar.push(forum);
            this.response.msg = ar;
            this.response.state = true;
            this.response.status = config.status.success;
         })

      }
      catch (err) {
         this.response.msg = err;
      }
      return this.response;
   }
   async getRowsLength(_query) {
      try {
         let query = await this.schema.find(_query);
         this.response.msg = query.length;
         this.response.status = config.status.success;
      }
      catch (err) {
         this.response.msg(err);
      }
      return this.response;
   }

   async createTopic(_id, _userID, _subject, _title) {
      try {
         let checkIdForum = await subForumModel.findOne({ _id: _id });
         if (checkIdForum) {
            let user = await userModel.findOne({ _id: _userID });
            let topic = [];
            let obj = {
               user: user.user,
               title: _title,
               subject: _subject,
               data: new Date()
            };
            topic.push(obj);
            let insert = await topicModel.insertMany([{ body: JSON.stringify(topic), forumID: _id, status: forumStatus.Opened }]);
            console.log(_title);
            this.response.state = true;
            this.response.status = config.status.created;
            this.response.msg = config.errors.success;
         }
         else {
            this.response.status = config.status.badRequest;
            this.response.msg = config.errors.notFound;
         }
      }
      catch (err) {
         this.response.status = config.status.badRequest;
         this.response.msg = err;
      }
      return this.response;
   }

   async insertComment(_id, _userID, _subject, _title) {
      try {
         let checkForum = await topicModel.findOne({ _id: _id });
         if (checkForum) {
            let user = await userModel.findOne({ _id: _userID });
            let comments = JSON.parse(checkForum.body);
            let obj = {
               user: user.user,
               title: _title,
               subject: _subject,
               data: new Date()
            };
            comments.push(obj);
            let insert = await topicModel.updateOne({ _id: _id }, { body: JSON.stringify(comments) });
            this.response.state = true;
            this.response.status = config.status.created;
            this.response.msg = config.errors.success;
         }
         else {
            this.response.status = config.status.badRequest;
            this.response.msg = config.errors.notFound;
         }
      }
      catch (err) {
         this.response.status = config.status.badRequest;
         this.response.msg = err;
      }
      return this.response;
   }

   async getTopicById(_userID, _id) {
      try {
         let checkTopic = await topicModel.findOne({ _id: _id });
         if (checkTopic) {
            if(_userID)
            {
               let getManager = await this.getAdminById(_userID);
               let admin = getManager.msg.indexOf(checkTopic.forumID);
               if(admin >=NONE)
               {
                  checkTopic._doc.isAdmin = true;
               }
            }
            this.response.state = true;
            this.response.status = config.status.success;
            this.response.msg = checkTopic;
         }
      }
      catch (err) {
         this.response.status = config.status.badRequest;
         this.response.msg = err.message;
      }
      return this.response;
   }
}

module.exports = Forum;
