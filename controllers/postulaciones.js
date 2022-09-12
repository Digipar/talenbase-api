const ObjectId = require("mongodb").ObjectID;
const Postulacion = require("../models/postulacion");
const Candidato = require("../models/candidato");
require("dotenv").config();
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';



exports.registerPostulacion = (req, res, next) => {
  if (!req.body.solicitudId) {
    res.status(404).send({ success: false, message: "No se recibieron datos" });
    return false;
  }
  const solicitudId = req.body.solicitudId;
  const candidatoId = req.userId;

  Candidato.find({ _id: ObjectId(candidatoId) })
    .then((candidatoResult) => {
      if (candidatoResult) {
        // console.log('candidatoResult', candidatoResult)
        if (candidatoResult.docNro) {
          const postulacion = new Postulacion(
            solicitudId, candidatoId
          );

          postulacion.save()
            .then((result) => {
              console.log(result)
              res.status(200).json(result);
            })
            .catch((err) => {
              console.log(err.code);
              res.status(500).json({
                success: false,
                message: "Error de comunicación",
              });
            });
        } else {
          res.status(500).json({
            success: false,
            message: "NO PERSONAL DATA"
          });
        }

      } else {
        res.status(500).json({
          success: false,
          message: "Email inválido",
        });
      }
    }).catch((err) => {
      console.log('err1', err)
      res.status(500).json({
        success: false,
        message: "Error de comunicación",
      });
    });
};

exports.findByFilterPostulacion = (req, res, next) => {
  Postulacion.findByFilter(req.body)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err.code);
      res.status(500).json({
        success: false,
        message: "Error de comunicación",
      });
    });
};

exports.findByCandidatoIdPostulacion = (req, res, next) => {
  const candidatoId = req.userId;
  console.log('candidatoId', candidatoId)
  Postulacion.findByCandidatoId(candidatoId)
    .then((result) => {
      // console.log(result)
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err.code);
      res.status(500).json({
        success: false,
        message: "Error de comunicación",
      });
    });
};
