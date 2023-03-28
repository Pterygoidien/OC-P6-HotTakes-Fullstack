const http = require("http");
const dotenv = require("dotenv").config(".env");
const app = require("./app");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`démarrage du serveur sur le port ${port}`);
});
