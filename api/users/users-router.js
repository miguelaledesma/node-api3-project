const express = require('express');


const User = require('./users-model'); 
const Post = require('../posts/posts-model'); 
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware.js'); 



const router = express.Router();
// You will need `users-model.js` and `posts-model.js` both //done
// The middleware functions also need to be required //done



router.get('/', (req, res, next) => {
  User.get()
  .then(users => {
    res.json(users); 
  })
  .catch(next)
});

router.get('/:id',validateUserId ,(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/',validateUser ,(req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.user)
  .then(user => {
    res.json(user)
  })

});

router.put('/:id',validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
  .then(updatedUser => {
    res.status(200).json(updatedUser); 
  })
  .catch(err => {
    res.status(400).json({ message: "missing required name" })
  })


});

router.delete('/:id',validateUserId ,(req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.user.id)
  .then(() => {
    res.status(200).json(req.user); 
  })
});

router.get('/:id/posts',validateUserId,(req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
  .then(post => { 
    res.json(post)
  })
});

router.post('/:id/posts',
validateUserId, validatePost ,(req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {user_id: req.params.id, text: req.text}
  Post.insert(postInfo)
  .then(post => {
    res.json(post); 
  })
  // try{
  //   const result = await Post.insert({
  //     user_id: req.params.id, 
  //     text: req.body.text 
  //   })
  //   res.status(200).json(result); 
  // }
  // catch(err){
  //   next(err)
  // }

});

// do not forget to export the router

module.exports = router