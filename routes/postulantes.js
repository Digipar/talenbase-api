const express = require('express');
const router = express.Router();
const postulantesController = require('../controllers/postulantes');

/* GET postulantes listing. */
router.get('/', postulantesController.getPostulantes);

module.exports = router;
