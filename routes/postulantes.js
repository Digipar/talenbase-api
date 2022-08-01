const express = require('express');
const router = express.Router();
const postulantesController = require('../controllers/postulantes');

/* GET postulantes listing. */
router.get('/', postulantesController.getPostulantes);
/* REGISTER NEW POSTULANTE */
router.post('/register', postulantesController.addPostulante);
router.put('/activate/:id?', postulantesController.activatePostulante);

module.exports = router;
