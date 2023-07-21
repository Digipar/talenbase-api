const Curriculum = require("../models/curriculum")
 
exports.uploadFile = (req, res, next) => { 
 
    const curriculum = new Curriculum(
        req.body
    ); 

    curriculum.save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log('error curriculum', err);
            res.status(500).json({
                success: false,
                message: "Error de comunicación",
            });
        });
   
  };