const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authGuard = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
    throw new Error("Vous n'avez pas de token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Token invalide");
  }
};
module.exports = authGuard;
