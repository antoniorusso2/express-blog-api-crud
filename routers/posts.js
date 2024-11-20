//import express
const express = require('express');

//import file posts
const posts = require('../posts.js');

//router
const router = express.Router();

//CRUD
//INDEX
router.get('/', (req, res) => {
  res.send('lista di elementi');
});

//SHOW
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`elemento con id: ${id}`);
});

//STORE
router.post('/', (req, res) => {
  res.send('creo un nuovo elemento');
});

//UPDATE
router.put('/:id', (req, res) => {
  const id = req.params.id;

  res.send(`modifico completamente l'elemento con id ${id}`);
});

//MODIFY
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`modifico parzialmente l'elemento con id ${id}`);
});

//DESTROY
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`elimino l'elemento con id ${id}`);
});

//export
module.exports = router;
