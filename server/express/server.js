const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.SERVER_PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}/`);
});
