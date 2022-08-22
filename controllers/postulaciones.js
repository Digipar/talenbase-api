const ObjectId = require("mongodb").ObjectID;
const Postulacion = require("../models/postulacion");
require("dotenv").config();
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';



exports.registerPostulacion = (req, res, next) => {
  const solicitudId = req.body.solicitudId;
  const candidatoId = req.userId;

  const postulacion = new Postulacion(
    solicitudId, candidatoId
  );
  console.log('postulacion', postulacion)
  postulacion.save()
    .then((result) => {
      console.log(result)
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.code);
      res.status(500).json({
        success: false,
        message: "COMMUNICATION_ERROR",
      });
    });
};

