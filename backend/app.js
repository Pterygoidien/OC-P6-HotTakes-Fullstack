const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoDB = require('./config/mongoDB');
const { errorMiddleware } = require('./middleware/error.middleware');


//on importe ./config/mongoDB.js qui s'occupe de la connexion à la base de données MongoDB, puis on l'exécute.
mongoDB();

const app = express();

//CORS (Cross Origin Resource Sharing) est un mécanisme qui permet d'accéder à des ressources distantes.
app.use(cors());
//on peut aussi le parametrer comme ceci:
//app.use(cors({origin: 'http://localhost:4200'}));

//On définit les headersqui seront utilisés dans les requêtes HTTP.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

//On importe les routes de sauces et des utilisateurs.
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/sauces', require('./routes/sauce.route'));

//on importe le middleware erreur en dernier pour qu'il soit appelé en dernier.
app.use(errorMiddleware);

module.exports = app;