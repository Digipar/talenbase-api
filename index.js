const path = require("path");
// const express = require("express");



// const app = express();
const app = require("./app")

const mongoConnect = require("./util/database").mongoConnect;


// app.use(express.static(path.join(__dirname, "public")));
app.listen(3001, () => {
  console.log("Talenbase connected, API is listening on port 3001");
});

mongoConnect(() => {
  console.log("MongoDB Connected");
});
