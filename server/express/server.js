const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: `http://localhost:${process.env.FRONTEND_CORS_ALLOWED_PORT}`,
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

require('../../app/routers/imagesRouter')(app);
require('../../app/routers/router')(app);

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

const PORT = (process.env.NODE_ENV === 'production') ? process.env.SERVER_PORT : 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}.`);
});
