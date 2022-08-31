const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudes');
const { authJwt } = require('../middleware');

/* To Do: validate JWT token */
/* GET solicitudes listing. */
router.get('/', solicitudesController.getSolicitudes);
router.get('/:spId', solicitudesController.getSolicitud);
router.post('/filtrar-solicitud-abierta', solicitudesController.findSolicitudAbierta);

/* UPDATE CANDIDATO 
router.put('/update', [authJwt.verifyToken], solicitudesController.updateCandidato);
router.put('/update-academic-data', [authJwt.verifyToken], solicitudesController.updateAcademicData);
router.put('/update-language-data', [authJwt.verifyToken], solicitudesController.updateLanguageData);
router.put('/update-previous-experience', [authJwt.verifyToken], solicitudesController.updatePreviousExperience);
*/
router.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'Código inválido'});
  });
module.exports = router;
