const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce.controller');
const authGuard = require('../guards/auth.guard');
const multer = require('../middleware/multer.middleware');


router.route('/')
    .get(authGuard, sauceController.getAllSauces)
    .post(authGuard, multer, sauceController.createSauce)
router.route('/:id')
    .get(authGuard, sauceController.getSauceById)
    .put(authGuard, multer, sauceController.updateSauce)
    .delete((req, res) => {
        res.send('Got a DELETE request at /user/:id');
    })
router.post('/:id/like', (req, res) => {
    res.send('Got a POST request at /user/:id/like');
})



module.exports = router;