const config = require("../configs");
const bcrypt = require("bcrypt");
const {userModel} = require("../models/users_model");
const {createToken} = require("../models/users_model");
const NONE = 0;

class User
{
   #id;
   #userName;
   #password;
   #email;
   #schema;
   constructor() {
      this.schema = userModel;
      this.errors = config.errors;
      this.response ={status: config.status.badRequest, msg: "failed",state:false};
      return this;
   }

   async getRowsLength(_query)
   {
      try
      {
         let query = await this.schema.find(_query);
         this.response.msg = query.length;
         this.response.status = config.status.success;
      }
      catch(err)
      {
         this.response.msg(err);
      }
      return this.response;
   }

   async register({user,email,password})
   {
      try
      {
         let userCount = await this.getRowsLength({user:user}).then(resp=>resp.msg);
         let emailCount = await this.getRowsLength({email:email}).then(resp=>resp.msg);
         if(userCount > NONE || emailCount > NONE)
         {
            this.response.msg = this.errors.userExist;
            this.response.status = config.status.success;
         }
         else
         {
            let salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            let query = await this.schema.insertMany([{user:user, email:email, password:password,manager:"[]"}])
            let test = await this.schema.findOne({user:user},{manager:1});
            console.log(JSON.parse(test.manager));
            this.response.msg = this.errors.success;
            this.response.state = true;
            this.response.status = config.status.created;
         }
      }
      catch(err)
      {
         this.response.status = config.status.internalServerError;
         this.response.msg = err.message;
      }
      return this.response;
   }

   async login({user,password})
   {
      try
      {
         let query = await this.schema.findOne({$or:[{user:user},{email:user}]});
         this.response.status = config.status.success;
         if(query)
         {
            let validPass = await bcrypt.compare(password, query.password);
            if (validPass) 
            { 
              this.response.state = true; 
              let token = await createToken(user,query.id);
              this.response.msg = token;
            }
            else
            {
               this.response.state = false;
            }
         }
      }
      catch(err)
      {
         this.response.status = config.status.internalServerError;
         this.response.msg = err;
      }
      return this.response;
   }

   async changeDetalis(_id,{user,email,password,signature})
   {
      try 
      {
         let salt = await bcrypt.genSalt(10);
         password = await bcrypt.hash(password, salt);
         let data = await this.schema.updateOne({ _id: _id }, {user:user,email:email,password:password,signature:signature});
         this.response.msg = config.errors.success;
         this.response.status = config.status.created;
         this.response.state = true;
       }
       catch (err) {
         this.response.status = config.status.success;
         this.response.msg = err;
      }
       return this.response;
   }

   async getAdminById(_id)
   {
      try 
      {
         let query = await this.schema.findOne({_id:_id},{manager:1});
         this.response.msg = JSON.parse(query.manager);
         this.response.status = config.status.created;
         this.response.state = true;
       }
       catch (err) {
         this.response.status = config.status.success;
         this.response.msg = err;
      }
       return this.response;
   }
}

module.exports = User;


