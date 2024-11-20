//express import
const express = require('express');
const app = express();
const port = 3000;

//import routers
const postsRouter = require('./routers/postsRouter.js');

app.get('/', (req, res) => {
  res.send('blog server');
});

app.use('/posts', postsRouter); //middleware uso prefisso /posts e poi quello impostato nei router

app.listen(3000, () => {
  console.log(`server listening on port ${port} `);
});

process.on('SIGINT', () => {
  console.log('Exiting');
  server.close();
  process.exit(0);
});
