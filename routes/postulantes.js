const express = require('express');
const router = express.Router();
const postulantesController = require('../controllers/postulantes');

/* GET postulantes listing. */
router.get('/', postulantesController.getPostulantes);
/* REGISTER NEW POSTULANTE */
router.post('/register', postulantesController.addPostulante);

module.exports = router;
