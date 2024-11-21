function validate(req) {
  const { title, slug, content, image, tags } = req.body;
  const errors = [];

  if (!title) errors.push('Title is required');

  if (!slug) errors.push('Slug is required');

  if (!content) errors.push('Content is required');

  if (!image) errors.push('Image is required');

  if (!tags) errors.push('Tags is required');

  return errors;
}

// const express = require('express');
const posts = require('../posts.js');

//index func
function index(req, res) {
  // console.log(req.query);

  //ricerca tramite query string con lo slug
  let filteredPosts = posts;

  // const tag = req.query.tag; //?? singolo tag, ma con piu' tag non funzionera'

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
  // res.send('creo un nuovo elemento');

  const bodyData = req.body;

  const { title, slug, content, image, tags } = bodyData;
  console.log(bodyData);

  const newId = posts.length + 1;

  const newElement = {
    id: newId,
    title,
    slug,
    content,
    image,
    tags
  };

  //validazione parametri necessari 'title'
  if (!title || title.length < 1) {
    res.status(400);

    res.send({
      error: '400',
      message: "L'elemento creato necessita della proprieta 'title'"
    });
  } else {
    posts.push(newElement);

    res.status(201).send('elemento creato con successo');
  }

  //log per verifica elemento creato e pushato
  console.log(posts);
}

//update func - put method
function update(req, res) {
  const id = parseInt(req.params.id);

  const errors = validate(req);
  console.log(errors);

  if (errors.length > 0) {
    res.status(400);

    return res.send({
      error: '400',
      message: errors
    });
  }

  const post = posts.find((post) => {
    return post.id === id;
  });

  //se il post da modificare non esiste allora ritorno errore 404
  if (!post) {
    res.status(404);

    return res.send({
      error: '404',
      message: 'Elemento da modificare inesistente'
    });
  }

  const bodyData = req.body;
  const { title, slug, content, image, tags } = bodyData;

  post.title = title;
  post.slug = slug;
  post.content = content;
  post.image = image;
  post.tags = tags;

  res.json(post);
}

//patch func
function modify(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => {
    return post.id === id;
  });

  if (!post) {
    res.status(404);

    return res.send({
      error: '404',
      message: 'Elemento da modificare inesistente'
    });
  }

  const { title, slug, content, image, tags } = req.body;

  if (title) post.title = title;

  res.send(post);
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
