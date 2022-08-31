const ObjectId = require("mongodb").ObjectID;
const Solicitud = require("../models/solicitud");
require("dotenv").config();
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';
const moment = require('moment');



exports.getSolicitudes = (req, res, next) => {
  Solicitud.fetchAll()
    .then((solicitud) => {
      res.status(200).json(solicitud);
    })
    .catch((err) => console.log(err));
};

exports.getSolicitud = (req, res, next) => {
  Solicitud.findBySpId(req.params.spId)
    .then((solicitud) => {
      res.status(200).json(solicitud);
    })
    .catch((err) => console.log(err));
};

exports.findSolicitudAbierta = (req, res, next) => {
  const filter = {
    reclutamiento: true,
    fechaFinSeleccion: { $gte: moment().format('YYYY-MM-DD') }
  };
  Solicitud.findByFilter(filter)
    .then((solicitud) => {
      res.status(200).json(solicitud);
    })
    .catch((err) => console.log(err));
};

