const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const verifyToken = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
    });
});

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


const createUser = async (email, password) => {
    const hashedPassword = await hashPassword(password);
    const user = new User({
        email,
        password: hashedPassword
    });
    await user.save();
    return user;
};

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email }).select('email password');
    return user;
};


const getUserData = async (id) => {
    const user = await User.findById(id).select('-password');
    return user;
}

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
    createUser,
    findUserByEmail,
    comparePassword,
    validateEmail, getUserData,
    verifyToken
}