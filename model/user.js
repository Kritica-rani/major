const mongoose = require("mongoose");
// define the schema for user

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: {
    type: String,
    require: true,
  },
  quotation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quotation",
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
