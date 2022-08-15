const ObjectId = require("mongodb").ObjectID;
const Postulante = require("../models/postulante");
require("dotenv").config();
// import { BSONTypeError } from "bson";

const update = (id, postulanteData, action, res) => {
  Postulante.findById(id)
    .then((encontrado) => {
      console.log("encontrado", encontrado);
      if (encontrado) {
        encontrado = { ...encontrado, ...postulanteData };
        switch (action) {
          case "UPDATE":
            encontrado = { ...encontrado };
            break;
          case "ACTIVATE":
            encontrado = { ...encontrado, emailValidated: true };

            break;
          case "ACADEMIC":
            encontrado = { ...encontrado, postulanteData };

            break;

          default:
            break;
        }
        console.log("encontrado", encontrado);

        const postulante = new Postulante(
          ...Object.values(encontrado),
        );

        postulante.save()
          .then((result) => {
            console.log(`Postulante ${action}D`);
            res.status(200).json(result);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("no encontrado");
        res.status(401).send({ success: false, message: "INVALID_USER" });
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
  let id = ObjectId(req.params.id);
  update(id, null, "ACTIVATE", res);
};

exports.updatePostulante = (req, res, next) => {
  console.log("Update postulante req.userId", req.userId);
  console.log("Update postulante body", req.body);
  let id = ObjectId(req.userId);
  let postulanteData = req.body;
  if (postulanteData) {
    update(id, postulanteData, "UPDATE", res);
  } else {
    // To Do: this case could be validated in the route definition
    res.status(404).send({ success: false, message: "NO_DATA_RECEIVED" });
  }
};
exports.updateAcademicData = (req, res, next) => {
  console.log("Update postulante req.userId", req.userId);
  console.log("Update postulante body", req.body);
  let id = ObjectId(req.userId);
  let postulanteData = req.body;
  if (postulanteData) {
    update(id, postulanteData, "ACADEMIC", res);
  } else {
    // To Do: this case could be validated in the route definition
    res.status(404).send({ success: false, message: "NO_DATA_RECEIVED" });
  }
};

exports.editProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc,
    new ObjectId(prodId)
  );
  product
    .save()
    .then((productData) => {})
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getPostulantes = (req, res, next) => {
  Postulante.fetchAll()
    .then((postulante) => {
      res.status(200).json(postulante);
    })
    .catch((err) => console.log(err));
};

exports.getPostulante = (req, res, next) => {
  Postulante.findByEmail(req.params.email)
    .then((postulante) => {
      res.status(200).json(postulante);
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
