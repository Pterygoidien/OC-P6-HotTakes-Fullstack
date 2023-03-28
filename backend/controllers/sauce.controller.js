const Sauce = require('../models/sauce.model');
const asyncHandler = require('express-async-handler');


/**
 * @desc   Get All Sauces
 * @route  GET /api/sauces
 * @access Private
 * @return {Array} sauces
 */
const getAllSauces = asyncHandler(async (req, res) => {
    try {
        const sauces = await Sauce.find();
        if (!sauces || sauces.length < 1) return res.status(404).json({
            success: false,
            message: "Aucune sauce n'a été trouvée"
        })
        res.status(200).json({
            success: true,
            sauces
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
})

/**
 * @desc   Get Sauce by ID
 * @route  GET /api/sauces/:id
 * @access Private
 * @param  {String} id
 * @return {Object} sauce
 */
const getSauceById = asyncHandler(async (req, res) => {
    try {
        const sauce = await Sauce.findById({ _id: req.params.id });
        res.status(200).json({
            success: true,
            sauce
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
})

/**
 * @desc   Create a new Sauce
 * @route  POST /api/sauces
 * @access Private
 * @param  {String} name
 * @param  {String} manufacturer
 * @param  {String} description
 * @param  {String} mainPepper
 * @param  {Number} heat
 * @param  {String} imageUrl
 * @return {Object} sauce
 */
const createSauce = asyncHandler(async (req, res) => {
    try {
        const sauce = await Sauce.create(req.body);
        res.status(201).json({
            success: true,
            sauce
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
})

module.exports = {
    getAllSauces,
    getSauceById,
    createSauce
}
