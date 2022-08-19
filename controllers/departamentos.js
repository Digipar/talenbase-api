const ObjectId = require("mongodb").ObjectID;
const Departamento = require("../models/departamento");
require("dotenv").config();
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';



exports.getDepartamentos = (req, res, next) => {
  Departamento.fetchAll()
    .then((departamento) => {
      res.status(200).json(departamento);
    })
    .catch((err) => console.log(err));
};

exports.getDepartamento = (req, res, next) => {
  Departamento.findByEmail(req.params.email)
    .then((departamento) => {
      res.status(200).json(departamento);
    })
    .catch((err) => console.log(err));
};

