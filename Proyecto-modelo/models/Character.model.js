const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const characterSchema = new Schema(
  {
    name: String,
    img: String,
    //apiId: Number,
  },
  {
    timestamps: true,
  }
);

// const Character = model("Character", userSchema);

module.exports = model("Character", characterSchema);
