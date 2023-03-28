const express = require("express");
const router = express.Router();



router.post("/signup", (req, res) => {
    console.log(req.body);
    res.send("Hello");
});
router.post('/login', (req, res) => {
    console.log(req.body);
    res.send("Hello");
});


module.exports = router;
