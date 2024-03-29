/**
 * @file: auth.controller.js
 * @description: This file contains the auth controller
 * @version: 1.0
 */

const authService = require('../services/auth.service');
/**
 * @desc    Sign in an existing user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Veuillez remplir tous les champs"
        })
    }
    const user = await authService.findUserByEmail(email);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "L'email n'est pas valide"
        })
    }
    const isMatch = await authService.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Le mot de passe n'est pas valide"
        })
    }
    const token = authService.generateToken(user);
    res.status(200).json({
        success: true,
        userId: user._id,
        token
    })
}
/**
 * @desc    Register new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Veuillez remplir tous les champs"
        })
    }
    if (!authService.validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "L'email n'est pas valide"
        })
    }
    const userAlreadyExists = await authService.findUserByEmail(email);
    if (userAlreadyExists) {
        return res.status(400).json({
            success: false,
            message: "L'email est déjà utilisé"
        })
    }
    try {
        const user = await authService.createUser(email, password);

        res.status(201).json({
            success: true,
            message: `Votre compte a bien été créé pour l'addresse ${email}`,
            data: user
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}



module.exports = {
    login,
    signUp
}
