// const express = require('express');
const posts = require('../posts.js');

//index func
function index(req, res) {
  // console.log(req.query);

  //ricerca tramite query string con lo slug
  let filteredPosts = posts;

  const tag = req.query.tag; //?? singolo tag, ma con piu' tag non funzionera'

  if (tag) {
    //filtro il post in base al tag fornito in query string
    filteredPosts = posts.filter((post) => {
      console.log(tag);

      return post.tags.includes(tag);
    });
  }

  if (filteredPosts.length === 0) {
    res.status(404);

    // ritorno json del messaggio post non trovato
    return res.json({
      error: '404',
      message: 'Tag not found'
    });
  }

  const limit = req.query.limit;
  if (limit && !isNaN(limit) && limit >= 0) {
    filteredPosts = posts.slice(0, limit);
  }

  res.json(filteredPosts);
}

//show func
function show(req, res) {
  const id = parseInt(req.params.id); //parametro dinamico

  const slug = req.query.slug;

  // console.log(slug);

  let filteredPost = posts.find((post) => {
    return post.id === id;
  });
  // console.log(filteredPost);

  if (slug) {
    filteredPost = posts.find((post) => post.slug === slug && post.id === id);
  }
  // console.log(filteredPost);

  // se il post non è presente return 404
  // cambio status da 200 a 404
  if (!filteredPost) {
    res.status(404);

    // ritorno json del messaggio post non trovato
    return res.json({
      error: '404',
      message: 'Post not found'
    });
  }

  res.json(filteredPost); //output
}

//store func
function store(req, res) {
  res.send('creo un nuovo elemento');
}

//update func
function update(req, res) {
  const id = parseInt(req.params.id);

  res.send(`modifico completamente l'elemento con id ${id}`);
}

//patch func
function modify(req, res) {
  const id = parseInt(req.params.id);

  return res.send(`modifico parzialmente l'elemento con id ${id}`);
}

//destroy func
function destroy(req, res) {
  const id = parseInt(req.params.id);

  //trovo direttamente l'index del post da eliminare da passare poi come parametro al metodo splice invocato sull'array di post
  const postIndex = posts.findIndex((post) => post.id === id); //return index del post gia' in formato numerico, se trovato || -1 se non trovato

  if (postIndex === -1) {
    res.status(404);

    return res.json({
      error: '404',
      message: 'Post not found'
    });
  }

  posts.splice(postIndex, 1);

  //invio status code 204 per notificare che l'operazione è andata a buon fine
  res.sendStatus(204);

  console.log(posts);
}

module.exports = { index, show, store, update, modify, destroy };
