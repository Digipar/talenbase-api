const express = require('express');
const router = express.Router();
const postulantesController = require('../controllers/postulantes');

/* GET postulantes listing. */
router.get('/', postulantesController.getPostulantes);
/* REGISTER NEW POSTULANTE */
router.post('/register', postulantesController.addPostulante);
router.put('/activate/:id([0-9a-fA-F]{24})?', postulantesController.activatePostulante);

module.exports = router;
