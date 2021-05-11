require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

const corsOptions = {
  origin: `${process.env.FRONTEND_CORS_ALLOWED_HOST}:${process.env.FRONTEND_CORS_ALLOWED_PORT}`,
};
app.use(cors(corsOptions));

app.use(express.static('media'));

app.use(bodyParser.json());

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'not json format' });
  } else {
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

require('../routers/imagesRouter')(app);
require('../routers/router')(app);

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

module.exports = app;
