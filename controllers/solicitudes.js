const ObjectId = require("mongodb").ObjectID;
const Solicitud = require("../models/solicitud");
require("dotenv").config();
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';



exports.getSolicitudes = (req, res, next) => {
  Solicitud.fetchAll()
    .then((solicitud) => {
      res.status(200).json(solicitud);
    })
    .catch((err) => console.log(err));
};

exports.getSolicitud = (req, res, next) => {
  Solicitud.findByEmail(req.params.email)
    .then((solicitud) => {
      res.status(200).json(solicitud);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};