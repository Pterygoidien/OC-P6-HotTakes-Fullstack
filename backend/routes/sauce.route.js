const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce.controller');
const authGuard = require('../guards/auth.guard');
const multer = require('../middleware/multer.middleware');

router.use(authGuard);

router.route('/')
    .get(sauceController.getAllSauces)
    .post(multer, sauceController.createSauce)
router.route('/:id')
    .get(sauceController.getSauceById)
    .put(multer, sauceController.updateSauce)
    .delete(sauceController.deleteSauce)
//router.post('/:id/like', authGuard, sauceController.likeSauce)



module.exports = router;