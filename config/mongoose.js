const mongoose = require("mongoose");
const URL =
  "mongodb+srv://kritica:1234@novquote.jdoefw1.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(() => console.log("mongoose db connected"))
  .catch((err) => console.log("error in coonecting db", err));
