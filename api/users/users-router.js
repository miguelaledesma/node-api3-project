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

router.put('/:id',validateUserId ,(req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
  .then(newUser => {
    res.status(200).json(newUser); 
  })
  .catch(err => {
    res.status(400).json({ message: "missing required name" })
  })


});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router