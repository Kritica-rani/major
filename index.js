const express = require("express");
const app = express();
const PORT = 4000;
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
