const ObjectId = require("mongodb").ObjectID;
const Candidato = require("../models/candidato");
require("dotenv").config();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';


const update = (id, candidatoData, action, res) => {
  Candidato.findById(id)
    .then((encontrado) => {
      console.log("encontrado", encontrado);
      if (encontrado) {
        encontrado = { ...encontrado, ...candidatoData };
        switch (action) {
          case "UPDATE":
            encontrado = { ...encontrado, actualizar: true };
            break;
          case "ACTIVATE":
            encontrado = { ...encontrado, emailValidated: true };

            break;
          case "ACADEMIC":
            encontrado = { ...encontrado, candidatoData, actualizar: true };

            break;
          case "LANGUAGE":
            encontrado = { ...encontrado, candidatoData, actualizar: true };

          case "PREVIOUS_EXPERIENCE":
            encontrado = { ...encontrado, candidatoData, actualizar: true };

            break;
          case "CHILD_DATA":
            encontrado = { ...encontrado, candidatoData, actualizar: true };

            break;

          default:
            break;
        }
        console.log("encontrado", encontrado);

        const candidato = new Candidato(
          ...Object.values(encontrado),
        );

        candidato.save()
          .then((result) => {
            console.log(`Candidato ${action}D`);
            res.status(200).json(result);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("no encontrado");
        res.status(401).send({ success: false, message: "Usuario inválido" });
        // .send({success: false, message: 'No encontrado'});
      }
    })
    .catch((err) => {
      console.log("Ups: ", err);
      // return -1;
      res.status(404).send({ success: false, message: "No encontrado" });
    });
};

exports.activate = (req, res, next) => {
  console.log("Activar cuenta req.params.id", req.params.id);
  let id = DBSYSTEM === 'COSMODB' ? req.params.id : ObjectId(req.params.id);
  update(id, null, "ACTIVATE", res);
};

exports.updateCandidato = (req, res, next) => {
  console.log("Update candidato req.userId", req.userId);
  console.log("Update candidato body", req.body);
  let id = DBSYSTEM === 'COSMODB' ? req.userId : ObjectId(req.userId);
  let candidatoData = req.body;
  if (candidatoData) {
    update(id, candidatoData, "UPDATE", res);
  } else {
    // To Do: this case could be validated in the route definition
    res.status(404).send({ success: false, message: "No se recibieron datos" });
  }
};
exports.updateAcademicData = (req, res, next) => {
  console.log("Update candidato req.userId", req.userId);
  console.log("Update candidato body", req.body);
  let id = DBSYSTEM === 'COSMODB' ? req.userId : ObjectId(req.userId);
  let candidatoData = req.body;
  if (candidatoData) {
    update(id, candidatoData, "ACADEMIC", res);
  } else {
    // To Do: this case could be validated in the route definition
    res.status(404).send({ success: false, message: "No se recibieron datos" });
  }
};
exports.updateLanguageData = (req, res, next) => {
  console.log("Update candidato req.userId", req.userId);
  console.log("Update candidato body", req.body);
  let id = DBSYSTEM === 'COSMODB' ? req.userId : ObjectId(req.userId);
  let candidatoData = req.body;
  if (candidatoData) {
    update(id, candidatoData, "LANGUAGE", res);
  } else {
    // To Do: this case could be validated in the route definition
    res.status(404).send({ success: false, message: "No se recibieron datos" });
  }
};

exports.updatePreviousExperience = (req, res, next) => {
  console.log("create previous experience req.userId", req.userId);
  console.log("create previous experience body", req.body);
  let id = (DBSYSTEM === 'COSMODB' ? req.userId : ObjectId(req.userId));
  let candidatoData = req.body;
  if (candidatoData) {
    update(id, candidatoData, "PREVIOUS_EXPERIENCE", res);
  } else {
    // To Do: this case could be validated in the route definition
    res.status(404).send({ success: false, message: "No se recibieron datos" });
  }
}
exports.updateChildData = (req, res, next) => {
  console.log("create CHILD DATA req.userId", req.userId);
  console.log("create CHILD DATA body", req.body);
  let id = (DBSYSTEM === 'COSMODB' ? req.userId : ObjectId(req.userId));
  let candidatoData = req.body;
  if (candidatoData) {
    update(id, candidatoData, "CHILD_DATA", res);
  } else {
    // To Do: this case could be validated in the route definition
    res.status(404).send({ success: false, message: "No se recibieron datos" });
  }
}

exports.getCandidatos = (req, res, next) => {
  Candidato.fetchAll()
    .then((candidato) => {
      res.status(200).json(candidato);
    })
    .catch((err) => console.log(err));
};

exports.getCandidato = (req, res, next) => {
  Candidato.findByEmail(req.params.email)
    .then((candidato) => {
      res.status(200).json(candidato);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.updateCandidatoPassword = (req, res, next) => {
  console.log('req.body', req.body)
  Candidato.find({ passwordResetHash: req.body.passwordResetHash })
    .then((candidatoResult) => {
      if (candidatoResult) {

        const candidatoUpdateData = {
          ...candidatoResult,
          password: bcrypt.hashSync(req.body.password, 10),
          passwordResetHash: null,
          passwordResetDateTime: null,
          emailValidated: true
        }

        const candidato = new Candidato(
          ...Object.values(candidatoUpdateData)
        )
        candidato.save()
          .then((result) => {
            res.status(200).json({ success: true, message: `Contraseña cambiada exitosamente`});
          }).catch((err) => {
            console.log('error', err);
            res.status(500).json({
              success: false,
              message: "Error de comunicación",
            });
          });
      } else {
        res.status(500).send({ success: false, message: "No se encontraron datos" });
      }
    }).catch((err) => {
      console.log('err', err)
    });
};