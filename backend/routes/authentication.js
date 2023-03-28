const express = require("express");
const router = express.Router();
const { signUp, logIn, showUsers } = require("../controllers/userController");


router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/", showUsers);

module.exports = router;
