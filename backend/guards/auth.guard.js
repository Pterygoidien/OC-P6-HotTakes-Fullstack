const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { getUserData, verifyToken } = require('../services/auth.service');


const authGuard = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = await verifyToken(token);
            req.user = await getUserData(decoded.id);
            next();


        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

module.exports = authGuard;