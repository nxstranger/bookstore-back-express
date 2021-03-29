const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: `http://localhost:${process.env.FRONTEND_CORS_ALLOWED_PORT}`,
};
app.use(cors(corsOptions));

const dbORM = require('../sequelize/models/index');

dbORM.sequelize.sync({
  force: (process.env.NODE_ENV !== 'production'),
})
  // eslint-disable-next-line no-console
  .then(() => console.log('db sync success'))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.use(bodyParser.json());

// catching err if not json data
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'not json format' });
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({ extended: true }));

// const route = require('./routers/user.router');
// app.use(route);
require('./routers/user.router')(app);

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

const PORT = (process.env.NODE_ENV === 'production') ? process.env.SERVER_PORT : 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}.`);
});
