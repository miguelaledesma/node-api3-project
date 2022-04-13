const Post = require('../posts/posts-model'); 
const User = require('../users/users-model'); 

function logger(req, res, next) {
  // DO YOUR MAGIC
  


  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId, 
  validateUser, 
  validatePost

}