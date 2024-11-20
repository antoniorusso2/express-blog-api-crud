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

    filteredPost = posts.filter((post) => {
      return post.slug === slug;
    });

    res.json(filteredPost);
    // console.log(filteredPost);
  } else {
    res.json(posts);
  }
}

//show func
function show(req, res) {
  const id = parseInt(req.params.id);

  // if (req.query.slug) {
  //   const slug = req.query.slug.toLowerCase();
  //   console.log(slug);

  //   filteredPost = posts.filter((post) => post.slug === slug);
  // }

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
