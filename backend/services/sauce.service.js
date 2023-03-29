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

const deleteSauce = async (id) => {
    try {
        const deletedSauce = await Sauce.findByIdAndDelete(id);
        return deletedSauce;
    }
    catch (error) {
        throw error;
    }
}

const likeSauce = async (userId, like, sauce) => {
    const userLiked = sauce.usersLiked;
    const userDisliked = sauce.usersDisliked;

    switch (like) {
        case 1:
            if (!userLiked.includes(userId)) {
                userLiked.push(userId);
            }
            break;
        case -1:
            if (!userDisliked.includes(userId)) {
                userDisliked.push(userId);
            }
            break;
        case 0:
            if (userLiked.includes(userId)) {
                userLiked.splice(userLiked.indexOf(userId), 1);
            }
            if (userDisliked.includes(userId)) {
                userDisliked.splice(userDisliked.indexOf(userId), 1);
            }
            break;
        default:
            throw { message: "Invalid request" };
    }

    try {
        const updatedSauce = await Sauce.findByIdAndUpdate(sauce._id, { usersLiked: userLiked, usersDisliked: userDisliked }, { new: true });
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
    updateSauce,
    deleteSauce,
    likeSauce


}

