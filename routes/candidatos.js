const express = require('express');
const router = express.Router();
const candidatosController = require('../controllers/candidatos');
const { authJwt } = require('../middleware');

/* To Do: validate JWT token */
/* GET candidatos listing. */
router.get('/', candidatosController.getCandidatos);
router.get('/:email', candidatosController.getCandidato);

/* UPDATE CANDIDATO */
router.post('/update-password', candidatosController.updateCandidatoPassword);
router.put('/update', [authJwt.verifyToken], candidatosController.updateCandidato);
router.put('/update-academic-data', [authJwt.verifyToken], candidatosController.updateAcademicData);
router.put('/update-language-data', [authJwt.verifyToken], candidatosController.updateLanguageData);
router.put('/update-previous-experience', [authJwt.verifyToken], candidatosController.updatePreviousExperience);
router.put('/update-personal-reference', [authJwt.verifyToken], candidatosController.updateChildData);
router.put('/update-child-data', [authJwt.verifyToken], candidatosController.updateChildData);
// router.delete('/delete-previous-experience', [authJwt.verifyToken], candidatosController.deletePreviousExperience);

router.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'Código inválido'});
  });
module.exports = router;
