const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoConnect = require("./util/database").mongoConnect;
const postulantesRouter = require("./routes/postulantes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/postulantes", postulantesRouter);
mongoConnect(() => {
  app.listen(3001, () => {
    console.log("Talenbase connected, API is listening on port 3001");
  });
});
