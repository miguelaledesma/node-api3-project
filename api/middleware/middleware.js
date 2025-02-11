const Post = require('../posts/posts-model'); 
const User = require('../users/users-model'); 

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method; 
  const url = req.originalUrl; 
  console.log(`[${timestamp}], ${method} to ${url}`)
  next(); 
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  User.getById(req.params.id)
  .then(user => {
    if(user){
      req.user = user; 
      next()
    } else{
      res.status(404).json({ message: "user not found" })
    }
  })
  .catch()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if( typeof req.body.name !== 'string' || req.body.name.trim() == '' ){
    res.status(400).json({ message: "missing required name field" }) 
    return 
  }
  req.user = { name: req.body.name.trim()}

  next(); 
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json({ message: "missing required text field" })
    
  } else {
    req.text = req.body.text.trim()
    next(); 
  }
  
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId, 
  validateUser, 
  validatePost

}