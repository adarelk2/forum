const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("../configs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  user: String,
  email: String,
  password: String,
  signature: String,
  date_time: {
    type: Date, default: Date.now
  },
  rule:{
    type:String, default:"user"
  },
  manager: String
});

const userModel = mongoose.model("users",userSchema);
exports.userModel = userModel;

const createToken = (_user,_id) => {
  let newToken = jwt.sign({user:_user,id:_id},config.salt,{expiresIn:"30mins"});
 // console.log(newToken)
  return newToken;
}

exports.createToken = createToken;

const validUser = (_userObj) => {
  let schema = Joi.object({
    user:Joi.string().min(4).max(50).required().messages({
      "string.base": `"user" ${config.errors.shouldBe} 'text'`,
      "string.empty": `"user" ${config.errors.empty}`,
      "any.required": `user ${config.errors.require}`,
    }),
    email: Joi.string().min(8).max(50).email().required().messages({
      "string.base": `"Email" ${config.errors.shouldBe} 'text'`,
      "string.empty": `"Email" ${config.errors.empty}`,
      "any.required": `Email ${config.errors.require}`,
      "string.email": `Email ${config.errors.valid}`,
    }),
    password:Joi.string().min(6).max(50).required().messages({
      "string.base": `"Password" ${config.errors.shouldBe} 'text'`,
      "string.empty": `"Password" ${config.errors.empty}`,
      "any.required": `Password ${config.errors.require}`,
    }),
   
  })
  return schema.validate(_userObj);
}
exports.validUser = validUser;

const validLogin = (_userObj) => {
  let schema = Joi.object({
    user:Joi.string().min(4).max(50).required().messages({
      "string.base": `"user" ${config.errors.shouldBe} 'text'`,
      "string.empty": `"user" ${config.errors.empty}`,
      "any.required": `user ${config.errors.require}`,
    }),
    password:Joi.string().min(6).max(50).required().messages({
      "string.base": `"Password" ${config.errors.shouldBe} 'text'`,
      "string.empty": `"Password" ${config.errors.empty}`,
      "any.required": `Password ${config.errors.require}`,
    }),
   
  })
  return schema.validate(_userObj);
}
exports.validLogin = validLogin;




