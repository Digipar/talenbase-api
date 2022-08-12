const express = require('express');
const router = express.Router();
const postulantesController = require('../controllers/postulantes');
const { authJwt } = require('../middleware');

/* To Do: validate JWT token */
/* GET postulantes listing. */
router.get('/', postulantesController.getPostulantes);
router.get('/:email', postulantesController.getPostulante);
/* REGISTER NEW POSTULANTE */
/* TO DO: move this route to auth.js */
router.post('/register', postulantesController.addPostulante);
/* TO DO: move this route to auth.js */
router.put('/activate/:id([0-9a-fA-F]{24})?', postulantesController.activatePostulante);
/* UPDATE POSTULANTE */
router.put('/update', [authJwt.verifyToken], postulantesController.updatePostulante);

router.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'CODE_INVALID'});
  });
module.exports = router;
