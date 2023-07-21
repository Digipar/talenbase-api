const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculum');
const { authJwt } = require('../middleware');

 

/* UPLOAD FILE */ 
router.post('/upload-file', [authJwt.verifyToken], curriculumController.uploadFile); 

router.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'Código inválido'});
  });

  
module.exports = router;
