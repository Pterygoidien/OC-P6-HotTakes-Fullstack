const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "veuillez ajouter une adresse email correcte"],
      unique: true,
      validate: {
        validator: value => {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        },
        message: "L'email n'est pas valide",
      },
    },
    password: {
      type: String,
      required: [true, "Le mot de passe n'est pas valide"],
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);
module.exports = User;
