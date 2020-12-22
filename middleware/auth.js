const jwt = require("jsonwebtoken");
const config = require('../configs');
var {userModel} = require("../models/users_model");
const bcrypt = require("bcrypt");

const authToken = async(req,res,next) => {
  let token = req.header("x-auth-token");
  if(!token){return res.status(config.status.badRequest).json({state:false,msg: "access denied" })}
  try{
    let checkToken = jwt.verify(token,config.salt);
    req.user = checkToken.user;
    req.id = checkToken.id;
    next();
  }
  catch(err){
    return res.status(config.status.badRequest).json({msg:err.message,state:false})
  }
}

exports.authToken = authToken