import { Router } from 'express';
import { getAll, findSolicitudAbierta, getSolicitud } from '../controllers/solicitudes.js';
import authJwt from '../middleware/authJwt.js';
const solicitudRouter = Router();

solicitudRouter.get('/', [authJwt.verifyToken], (req, res, next) => {
    getAll(req, res)
});

solicitudRouter.post('/filtrar-solicitud-abierta', (req, res, next) => {
    findSolicitudAbierta(req, res)
});

solicitudRouter.get('/:Id', (req, res, next) => {
    getSolicitud(req, res)
});

export default solicitudRouter;