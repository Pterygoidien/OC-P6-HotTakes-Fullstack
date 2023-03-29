//server.js s'occupe de lancer le serveur et importe app.js qui lui s'occupe de lancer l'application et de gérer la logique interne de l'application. 

const http = require("http");
const app = require("./app");

const port = process.env.HOST_PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Démarage du serveur sur le port ${port}`);
});