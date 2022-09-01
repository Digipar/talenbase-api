const ObjectId = require("mongodb").ObjectID;
const Mailer = require("../models/mailer");
const Candidato = require("../models/candidato")
require("dotenv").config();
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';



exports.registerMailerResetPass = (req, res, next) => {
    console.log('req.body', req.body)
    const direccion = req.body.email;
    Candidato.findByEmail(direccion)
        .then((candidato) => {
            if (candidato) {
                const cuerpo = `Recibimos una solicitud de cambio de contraseña, haz click en el siguiente enlace: \n ` + `http://${process.env.APP_HOST}/reset-password/${candidato._id}` + `\n\n*** ESTE ES UN EMAIL GENERADO AUTOMÁTICAMENTE. NO RESPONDA  AL MISMO ***`;
                const candidatoId = candidato._id
                const mailer = new Mailer(
                    'RESETPASS', direccion, candidatoId, cuerpo
                );

                mailer.save()
                    .then((result) => {
                        res.status(200).json(result);
                    }).catch((err) => {
                        console.log('error mailer', err);
                        res.status(500).json({
                            success: false,
                            message: "Error de comunicación",
                        });
                    });
            }else{
                res.status(500).json({
                    success: false,
                    message: "Email inválido",
                });
            }
        }).catch((err) => {
            console.log('err', err)
            res.status(500).json({
                success: false,
                message: "Error de comunicación",
            });
        });
};
