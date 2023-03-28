const Sauce = require('../models/sauce.model');

const createSauce = async (sauce) => {
    try {
        const newSauce = new Sauce(sauce);
        await newSauce.save();
        return newSauce;
    }
    catch (error) {
        throw error;
    }
}

const getAllSauces = async () => {
    try {
        const sauces = await Sauce.find();
        return sauces;
    }
    catch (error) {
        throw error;
        console.log(error);
    }
}

const getSauceById = async (id) => {
    try {
        const sauce = await Sauce.findById(id);
        return sauce;
    }
    catch (error) {
        throw error;
    }
}

const updateSauce = async (id, sauce) => {
    try {
        const updatedSauce = await Sauce.findByIdAndUpdate(id, sauce, { new: true });
        return updatedSauce;
    }
    catch (error) {
        throw error;
    }
}




module.exports = {
    createSauce,
    getAllSauces,
    getSauceById,
    updateSauce


}

