import { Router } from 'express';
const departamentoRouter = Router(); 
import {getAll,getDepartmentsByCandidato} from '../controllers/departamentos.js'
 
import { verifyToken } from '../middleware/authJwt.js';
departamentoRouter.get('/',[verifyToken], getAll); 

departamentoRouter.get('/departments-by-candidato/:id',[verifyToken], getDepartmentsByCandidato); 
 
export default departamentoRouter
