import { Router } from 'express';
import { getPostulanteSolicitudByCandidatoId,registerPostulacion } from '../controllers/postulaciones.js';
import { verifyToken } from '../middleware/authJwt.js';
const postulacionRouter = Router();

/* To Do: validate JWT token */

postulacionRouter.post('/registrar-postulacion', [verifyToken], registerPostulacion);
// router.post('/filtrar-postulacion', postulacionesController.findByFilterPostulacion);
// router.post('/find-by-candidato-postulacion', [authJwt.verifyToken], postulacionesController.findByCandidatoIdPostulacion);
postulacionRouter.post('/find-by-candidato-postulacion',[verifyToken], (req, res, next) => {
  getPostulanteSolicitudByCandidatoId(req, res)
});

// router.use(function (req, res, next) {
//   console.log('error 404 por código inválido');
//   res.status(404).send({ success: false, message: 'Código inválido' });
// });
// module.exports = router;

export default postulacionRouter;
