const ObjectId = require("mongodb").ObjectID;
const Postulante = require("../models/postulante");
// import { BSONTypeError } from "bson";

exports.addPostulante = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const postulante = new Postulante(
    email,
    password,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    false,
    ""
  );
  postulante
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.code);
      res.status(500).json({
        success: false,
        message: "Error de comunicación con el servidor",
      });
    });
};

exports.activatePostulante = (req, res, next) => {
  console.log("Activar postulante req.params.id", req.params.id);
  let id = ObjectId(req.params.id);
  Postulante.findById(id)
    .then((encontrado) => {
      console.log("encontrado", encontrado);
      if (encontrado) {
        // activate
        const postulante = new Postulante(
          encontrado.email,
          encontrado.password,
          encontrado.docNro,
          encontrado.nombreCompleto,
          encontrado.estadoCivil,
          encontrado.sexo,
          encontrado.fechaNacimiento,
          encontrado.nacionalidad,
          encontrado.telefono,
          encontrado.direccion,
          encontrado.pais,
          encontrado.departamento,
          encontrado.ciudad,
          true,
          id
        );
        postulante
          .save()
          .then((result) => {
            console.log("Activado postulante");
            res.status(200).json(result);
          })
          .catch((err) => console.log(err));
      } else {
        console.log('no encontrado')
        res.status(404).send({success: false, message: 'No encontrado'});
      }
    })
    .catch((err) => {
      console.log("Ups: ", err);
      // return -1;
      res.status(404);
    });
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

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
