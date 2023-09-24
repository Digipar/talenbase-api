const ObjectId = require("mongodb").ObjectID;
const Mailer = require("../models/mailer");
const Candidato = require("../models/candidato")
require("dotenv").config();
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';
const CryptoJS = require("crypto-js");
const moment = require('moment');


exports.registerMailerAcivateAccount = (req, res, next) => {
        Candidato.find({ email: req.body.email })
            .then((candidatoResult) => {
                if (candidatoResult) {
                    console.log('candidatoResult', candidatoResult)
                    const cuerpo = `Bienvenido a Talenbase, para activar su cuenta ingrese a ` + `http://${process.env.APP_HOST}/activate-account/${candidatoResult._id}` + `\n\n*** ESTE ES UN EMAIL GENERADO AUTOMÁTICAMENTE. NO RESPONDA  AL MISMO ***`;
                    const mailer = new Mailer(
                        'ACTIVACION', req.body.email, candidatoResult._id, cuerpo
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

exports.registerMailerResetPass = (req, res, next) => {
    console.log('req.body', req.body)
    const direccion = req.body.email;
    Candidato.find({ email: direccion })
        .then((candidatoResult) => {
            if (candidatoResult) {

                const passwordResetHashGenerado = CryptoJS.SHA1(new Date().toISOString().toString()).toString().substring(0, 24);
                const passwordResetDateTimeGenerado = moment().format('YYYY-MM-DD HH:mm:ss');

                const candidatoUpdateData = {
                    ...candidatoResult,
                    passwordResetHash: passwordResetHashGenerado,
                    passwordResetDateTime: passwordResetDateTimeGenerado
                }

                const candidato = new Candidato(
                    ...Object.values(candidatoUpdateData)
                )
                candidato.save()
                    .then((result) => {
                        const cuerpo = `Recibimos una solicitud de cambio de contraseña, haz click en el siguiente enlace: \n ` + `http://${process.env.APP_HOST}/reset-password/${passwordResetHashGenerado}` + `\n\n*** ESTE ES UN EMAIL GENERADO AUTOMÁTICAMENTE. NO RESPONDA  AL MISMO ***`;
                        const candidatoId = candidatoResult._id
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
                    }).catch((err) => {
                        console.log('error', err);
                        res.status(500).json({
                            success: false,
                            message: "Error de comunicación",
                        });
                    });


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
