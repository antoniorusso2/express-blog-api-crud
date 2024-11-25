//express import
const express = require('express');
//import routers
const postsRouter = require('./routers/postsRouter.js');
//middleware orario
const checkTime = require('./middlewares/checkTime.js');

const errorHandler = require('./middlewares/errorsHandler.js');
const notFound = require('./middlewares/notFound.js');

const app = express();
const port = 3000;

app.use(checkTime);
//body parser json
app.use(express.json());

app.get('/', (req, res) => {
  // throw new Error('errore finto');

  res.send('blog server');
});

//utilizzo del middleware check time solo per la rotta indicata
//!app.use('/posts', checkTime, postsRouter);
app.use('/posts', postsRouter); //middleware uso prefisso /posts e poi quello impostato nei router

app.use(errorHandler);
app.use(notFound);

app.listen(3000, () => {
  console.log(`server listening on port ${port} `);
});

process.on('SIGINT', () => {
  console.log('Exiting');
  server.close();
  process.exit(0);
});
