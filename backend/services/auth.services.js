const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const verifyToken = (
) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


const createUsers = async (email, password) => {
    const hashedPassword = await hashPassword(password);
    const user = new User({
        email,
        password: hashedPassword
    });
    await user.save();
    return user;
};

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};


const comparePassword = (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
}

const validateEmail = (email) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}
module.exports = {
    generateToken,
    verifyToken,
    createUsers,
    findUserByEmail,
    comparePassword,
    validateEmail
}