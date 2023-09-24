import { Router } from 'express';
const candidatoRouter = Router(); 
import {
    getCandidato,
    updateCandidato,
    updateAcademicData,
    getCandidatoIdioma,
    updateLanguageData,
    getCandidatoExperienciaLaboral,
    deletePreviousExperience,
    updatePreviousExperience,
    getCandidatoReferenciaPersonal,
    updatePersonalReference,
    deletePersonalReference,
    updateDepartments,
    updateCandidatoPassword
  } from "../controllers/candidatos.js";
import { verifyToken } from '../middleware/authJwt.js';

/* To Do: validate JWT token */
/* GET candidatos listing. */
// candidatoRouter.get('/', getCandidatos);
candidatoRouter.get('/:email',[verifyToken], getCandidato); 
candidatoRouter.get('/idiomas/:id',[verifyToken], getCandidatoIdioma); 
candidatoRouter.put('/update', [verifyToken], updateCandidato);
candidatoRouter.put('/update-academic-data', [verifyToken], updateAcademicData);
candidatoRouter.put('/update-language-data', [verifyToken], updateLanguageData);
candidatoRouter.get('/previous-experience/:id',[verifyToken], getCandidatoExperienciaLaboral); 
candidatoRouter.put('/update-previous-experience', [verifyToken], updatePreviousExperience);
candidatoRouter.delete('/delete-previous-experience/:id', [verifyToken], deletePreviousExperience);
candidatoRouter.get('/personal-reference/:id',[verifyToken], getCandidatoReferenciaPersonal); 
candidatoRouter.put('/update-personal-reference', [verifyToken], updatePersonalReference);
candidatoRouter.delete('/delete-personal-reference/:id', [verifyToken], deletePersonalReference);
candidatoRouter.put('/update-departments', [verifyToken], updateDepartments);

/* UPDATE CANDIDATO */
candidatoRouter.post('/update-password', updateCandidatoPassword);


export default candidatoRouter
