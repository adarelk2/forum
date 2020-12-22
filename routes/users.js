var express = require('express');
var router = express.Router();
var mongo = require("../dbs_connected/mongo_connected");
var {userModel,validUser,validLogin} = require("../models/users_model");
var {MessageModel} = require("../models/forums_model");
var User = require("../class/User");
const config = require('../configs');
const {authToken} = require('../middleware/auth');
/* GET users listing. */
router.post('/register', async function(req, res, next) {
  let valid = validUser(req.body);
  if(!valid.error)
  {
    let user = new User();
    let register = await user.register(req.body);
    res.status(register.status).json(register);  
  }
  else
  {
    res.status(config.status.badRequest).json(valid.error.details);  
  }
});

router.post('/login', async function(req, res, next) {
  let valid = validLogin(req.body);
  if(!valid.error)
  {
    let user = new User();
    let login = await user.login(req.body);
    res.json(login);  
  }
  else
  {
    res.status(config.status.badRequest).json(valid.error.details);  
  }
});

router.get('/auth',authToken, async function(req, res, next) {
  let response = {
    msg:config.errors.success,
    state:true,
    status:config.status.success
  };
  res.status(response.status).json({resp:response});
});

router.post('/change-detalis',authToken, async function(req, res, next) {
  let valid = validUser(req.body);
  if(!valid.error)
  {
  let user = new User();
  let changeDetalis = await user.changeDetalis(req.id,req.body);
  res.status(changeDetalis.status).json({resp:changeDetalis});  
  }
  else
  {
    res.status(config.status.badRequest).json({resp:valid.error.details});  
  }
});

router.get('/getMessages',authToken, async function(req, res, next) {
  let messages = new Message(MessageModel);

  
});
module.exports = router;
