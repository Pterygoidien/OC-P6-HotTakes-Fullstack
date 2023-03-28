const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Le nom de la sauce est requis"],
      unique: true,
    },
    manufacturer: {
      type: String,
      required: [true, "Le nom du fabricant est requis"],
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
    },
    mainPepper: {
      type: String,
      required: [true, "Le nom du principal ingrédient est requis"],
    },
    imageUrl: {
      type: String,
      required: [true, "L'image est requise"],
    },
    heat: {
      type: Number,
      required: [true, "Le niveau de chaleur est requis"],
      min: 1,
      max: 10,
    },

    usersLiked: {
      type: [String],
      default: [],
    },
    usersDisliked: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

sauceSchema.virtual("likes").get(function () {
  return this.usersLiked.length;
});

sauceSchema.virtual("dislikes").get(function () {
  return this.usersDisliked.length;
});

module.exports = Sauce = mongoose.model("Sauce", sauceSchema);
