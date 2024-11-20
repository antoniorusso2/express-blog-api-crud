//import express
const express = require('express');

//import file posts
const posts = require('../posts.js');

//controller import
const postsController = require('../controllers/postController.js');

//destructuring oggetto esportato dal file posts controller
const { index, show, store, update, modify, destroy } = postsController;

//router
const router = express.Router();

//CRUD
//INDEX
router.get('/', index);

//SHOW
router.get('/:id', show);

//STORE
router.post('/', store);

//UPDATE
router.put('/:id', update);

//MODIFY
router.patch('/:id', modify);

//DESTROY
router.delete('/:id', destroy);

//export
module.exports = router;
