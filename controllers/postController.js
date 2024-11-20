// const express = require('express');
const posts = require('../posts.js');

//index func
function index(req, res) {
  // console.log(req.query);

  //ricerca tramite query string con lo slug
  let filteredPost = posts;

  if (req.query.slug) {
    const slug = req.query.slug.toLowerCase();
    console.log(slug);

    filteredPost = posts.filter((post) => post.slug === slug);
  } else {
    res.json(filteredPost);
  }
}

//show func
function show(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.find((el) => {
    return el.id === id;
  });

  //se il post non è presente return 404
  if (!post) {
    //cambio status da 200 a 404
    res.status(404);

    //ritorno json del messaggio post non trovato
    return res.json({
      error: '404',
      message: 'Post not found'
    });
  } else {
    res.json(post);
  }
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
