require('dotenv').config();
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
// const Candidato = require("../models/").Candidato;
// const User = db.user;
verifyToken = (req, res, next) => {
  console.log('verifyToken...')
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "Token no recibido!",
    });
  }
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No autorizado!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const authJwt = {
  verifyToken
  };
module.exports = authJwt;
