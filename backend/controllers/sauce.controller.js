const asyncHandler = require('express-async-handler');
const sauceService = require('../services/sauce.service');

/**
 * @desc   Get All Sauces
 * @route  GET /api/sauces
 * @access Private
 * @return {Array} sauces
 */
const getAllSauces = asyncHandler(async (req, res) => {
    try {
        const sauces = await sauceService.getAllSauces();
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
        const sauce = await sauceService.getSauceById(req.params.id);
        if (!sauce) return res.status(404).json({
            success: false,
            message: "Aucune sauce n'a été trouvée"
        })
        res.status(200).json(
            sauce
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
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
    if (!req.file) return res.status(400).json({
        success: false,
        message: "Aucune image n'a été trouvée"
    })
    if (!req.body.sauce) return res.status(400).json({
        success: false,
        message: "Aucune sauce n'a été trouvée"
    })
    const sauce = JSON.parse(req.body.sauce);
    sauce.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    try {
        const newSauce = await sauceService.createSauce(sauce);
        res.status(201).json({
            success: true,
            message: "Sauce créée avec succès",
            sauce: newSauce
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
        })
    }
})


/**
 * @desc   Update a Sauce
 * @route  PUT /api/sauces/:id
 * @access Private
 * @param  {String} id
 * @param  {String} name
 * @param  {String} manufacturer
 * @param  {String} description
 * @param  {String} mainPepper
 * @param  {Number} heat
 * @param  {String} imageUrl
 * @return {Object} sauce
 */
const updateSauce = asyncHandler(async (req, res) => {
    const sauce = await sauceService.getSauceById(req.params.id);
    if (!sauce) return res.status(404).json({
        success: false,
        message: "Cette sauce n'a pas été trouvée dans notre base de donnée. "
    })
    if (!req.body) return res.status(400).json({
        success: false,
        message: "Aucune sauce n'a été trouvée",
        body: req.body
    })

    if (!req.user || sauce.userId.toString() !== req.user._id.toString()) return res.status(401).json({
        success: false,
        message: "Vous n'êtes pas autorisé à modifier cette sauce",
        createdBy: sauce.userId,
        user: req.user._id
    })

    try {
        const updatedSauce = await sauceService.updateSauce(req.params.id, { ...JSON.parse(req.body) });
        res.status(200).json({
            success: true,
            message: "Sauce modifiée avec succès",
            sauce
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
        })
    }



})


module.exports = {
    getAllSauces,
    getSauceById,
    createSauce,
    updateSauce
}
