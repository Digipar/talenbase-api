const express = require('express');
const router = express.Router();
const departamentosController = require('../controllers/departamentos');
const { authJwt } = require('../middleware');

/* To Do: validate JWT token */
/* GET departamentos listing. */
router.get('/', departamentosController.getDepartamentos);
router.get('/:slug', departamentosController.getDepartamento);

/* UPDATE CANDIDATO 
router.put('/update', [authJwt.verifyToken], departamentosController.updateCandidato);
router.put('/update-academic-data', [authJwt.verifyToken], departamentosController.updateAcademicData);
router.put('/update-language-data', [authJwt.verifyToken], departamentosController.updateLanguageData);
router.put('/update-previous-experience', [authJwt.verifyToken], departamentosController.updatePreviousExperience);
*/
router.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'CODE_INVALID'});
  });
module.exports = router;
