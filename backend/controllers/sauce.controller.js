const asyncHandler = require('express-async-handler');
const UserService = require('../services/sauce.service');



/**
 * @desc   Get All Sauces
 * @route  GET /api/sauces
 * @access Private
 * @return {Array} sauces
 */
const getAllSauces = asyncHandler(async (req, res) => {
    try {
        const sauces = await UserService.getAllSauces();
        if (!sauces || sauces.length < 1) return res.status(404).json({
            success: false,
            message: "Aucune sauce n'a été trouvée"
        })
        res.status(200).json(
            sauces
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error
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
const addSauce = asyncHandler(async (req, res) => {
    const sauce = JSON.parse(req.body.sauce);
    const newSauce = new Sauce({
        userId: req.user._id,
        name: sauce.name,
        manufacturer: sauce.manufacturer,
        description: sauce.description,
        mainPepper: sauce.mainPepper,
        heat: sauce.heat,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    await newSauce.save();

    res.status(201).json({
        success: true,
        message: "Sauce ajoutée avec succès",
        sauce: newSauce
    })
})

module.exports = {
    getAllSauces,
    getSauceById,
    addSauce
}
