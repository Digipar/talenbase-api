const express = require('express');
const router = express.Router();
const postulacionesController = require('../controllers/postulaciones');
const { authJwt } = require('../middleware');

/* To Do: validate JWT token */

router.post('/registrar-postulacion', [authJwt.verifyToken], postulacionesController.registerPostulacion);
router.post('/filtrar-postulacion', postulacionesController.findByFilterPostulacion);
router.post('/find-by-candidato-postulacion', [authJwt.verifyToken], postulacionesController.findByCandidatoIdPostulacion);

router.use(function (req, res, next) {
  console.log('error 404 por código inválido');
  res.status(404).send({ success: false, message: 'Código inválido' });
});
module.exports = router;
