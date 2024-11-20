const express = require('express');
const posts = require('../posts.js');

//index func
function index(req, res) {
  return res.json(posts);
}

//show func
function show(req, res) {
  const id = parseInt(req.params.id);

  const result = posts.find((el) => {
    return el.id === id;
  });

  return res.json(result);
}

//store func
function store(req, res) {
  return res.send('creo un nuovo elemento');
}

//update func
function update(req, res) {
  const id = parseInt(req.params.id);

  return res.send(`modifico completamente l'elemento con id ${id}`);
}

//patch func
function modify(req, res) {
  const id = parseInt(req.params.id);

  return res.send(`modifico parzialmente l'elemento con id ${id}`);
}

//destroy func
function destroy(req, res) {
  const id = parseInt(req.params.id);

  res.send(`elimino l'elemento con id ${id}`);
}

module.exports = { index, show, store, update, modify, destroy };
