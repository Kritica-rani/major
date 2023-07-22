const express = require("express");
const jwt = require("./config/passport_jwt");
const app = express();
const PORT = 8000;
const db = require("./config/mongoose");
//import routes folder
const routes = require("./routes/routes");

app.use(express.urlencoded());
app.use("/", routes);

app.listen(PORT, (err) => {
  if (err) {
    console.log("error in starting", err);
  }
  console.log("server is up and running", PORT);
});
