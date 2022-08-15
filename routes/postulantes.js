const express = require('express');
const router = express.Router();
const postulantesController = require('../controllers/postulantes');
const { authJwt } = require('../middleware');

/* To Do: validate JWT token */
/* GET postulantes listing. */
router.get('/', postulantesController.getPostulantes);
router.get('/:email', postulantesController.getPostulante);

/* UPDATE POSTULANTE */
router.put('/update', [authJwt.verifyToken], postulantesController.updatePostulante);
router.put('/update-academic-data', [authJwt.verifyToken], postulantesController.updateAcademicData);

router.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'CODE_INVALID'});
  });
module.exports = router;
