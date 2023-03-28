const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

/**
 * @desc    Register new user
 * @route   POST /api/signup
 * @access  Public
 */
const signUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Les champs email et mot de passe sont obligatoires");
    }

    //Vérifier si l'utilisateur existe
    const isAlreadyRegistered = await User.findOne({ email });
    if (isAlreadyRegistered) {
        res.status(401);
        throw new Error("L'utilisateur existe déjà");
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({ email, password: hashedPassword });

    if (user) {
        res.status(201).json({
            userId: user._id,
            token: generateToken(user._id),
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Une erreur est survenue, veuillez réessayer");
    }
});

/**
 * @desc    Sign in an existing user
 * @route   POST /api/login
 * @access  Public
 */
const logIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            userId: user._id,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("L'identifiant ou le mot de passe est incorrect");
    }
});

/**
 * Private function
 */
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
    signUp,
    logIn,
};
