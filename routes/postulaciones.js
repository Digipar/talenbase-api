import { Router } from 'express';
import { getPostulanteSolicitudByCandidatoId } from '../controllers/postulaciones.js';
import authJwt from '../middleware/authJwt.js';
const postulacionRouter = Router();

/* To Do: validate JWT token */

// router.post('/registrar-postulacion', [authJwt.verifyToken], postulacionesController.registerPostulacion);
// router.post('/filtrar-postulacion', postulacionesController.findByFilterPostulacion);
// router.post('/find-by-candidato-postulacion', [authJwt.verifyToken], postulacionesController.findByCandidatoIdPostulacion);
postulacionRouter.post('/find-by-candidato-postulacion', [authJwt.verifyToken], (req, res, next) => {
  getPostulanteSolicitudByCandidatoId(req, res)
});

// router.use(function (req, res, next) {
//   console.log('error 404 por código inválido');
//   res.status(404).send({ success: false, message: 'Código inválido' });
// });
// module.exports = router;

export default postulacionRouter;
