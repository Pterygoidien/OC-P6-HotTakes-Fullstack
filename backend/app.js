const express = require("express");
require('express-async-errors');
const path = require("path");
const cors = require("cors");
const mongoDB = require("./config/mongoDB");

const { errorHandler } = require("./middleware/errorMiddleware");

//connect to database
mongoDB();

const app = express();


app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

// Set our api routes
app.use("/api/auth", require("./routes/authentication"));
app.use("/api/sauces", require("./routes/sauces"));

app.use(errorHandler);

module.exports = app;
