const mongoose = require("mongoose");


const mongoDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb-service:27017/hottake?authSource=admin`, {});
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}
module.exports = mongoDB;
