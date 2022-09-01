const express = require('express');
const router = express.Router();
const mailerController = require('../controllers/mailer');
const { authJwt } = require('../middleware');

router.post('/register-mailer-reset-pass', mailerController.registerMailerResetPass);

router.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'Código inválido'});
  });
module.exports = router;
