import { Router } from 'express';
import {getAll,getDepartmentsByCandidato} from '../controllers/departamentos.js'
import { verifyToken } from '../middleware/authJwt.js';

const departamentoRouter = Router(); 
 
departamentoRouter.get('/',[verifyToken], getAll); 

departamentoRouter.get('/departments-by-candidato/:id',[verifyToken], getDepartmentsByCandidato); 
 
export default departamentoRouter
