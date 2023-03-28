const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('Got a GET request');
    })
    .post((req, res) => {
        res.send('Got a POST request');
    })
router.route('/:id')
    .get((req, res) => {
        res.send('Got a GET request at /user/:id');
    })
    .put((req, res) => {
        res.send('Got a PUT request at /user/:id');
    })
    .delete((req, res) => {
        res.send('Got a DELETE request at /user/:id');
    })
router.post('/:id/like', (req, res) => {
    res.send('Got a POST request at /user/:id/like');
})



module.exports = router;