const ObjectId = require("mongodb").ObjectID;
const Postulante = require("../models/postulante");
require("dotenv").config();
// import { BSONTypeError } from "bson";

exports.addPostulante = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const nombreCompleto = req.body.nombreCompleto;

  const postulante = new Postulante(
    email,
    password,
    "",
    nombreCompleto,
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
    "",
    "",
    [],
    [],
    [],
    [],
    []
  );
  postulante
    .save()
    .then((result) => {
      console.log(result);
      console.log(`http://${process.env.APP_HOST}/validate-email/${result.id}`);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.code);
      res.status(500).json({
        success: false,
        message: "COMMUNICATION_ERROR",
      });
    });
};

const update = (id,postulanteData,action,res) => {
  Postulante.findById(id)
    .then((r) => {
      console.log("encontrado", r);
      if (r) {
        r = {...r, ...postulanteData};
        console.log('r', r)
        const postulante = new Postulante(r.email,r.password,r.docNro,r.nombreCompleto,r.estadoCivil,r.sexo,r.fechaNacimiento,
        r.nacionalidad,r.telefono,r.direccion,r.pais,r.departamento,r.ciudad,
        action=='ACTIVATE' ? true : r.emailActivated,r.sharepointId,r._id.toString(),[],[],[],[],[]);
        
        
        postulante
          .save()
          .then((result) => {
            console.log( `Postulante ${action}D`);
            res.status(200).json(result);
          })
          .catch((err) => console.log(err));
      } else {
        console.log('no encontrado')
        res.status(401).send({success: false, message: 'INVALID_USER'});
        // .send({success: false, message: 'No encontrado'});
      }
    })
    .catch((err) => {
      console.log("Ups: ", err);
      // return -1;
      res.status(404).send({success: false, message: 'No encontrado'});
    });
}

exports.activatePostulante = (req, res, next) => {
  console.log("Activar postulante req.params.id", req.params.id);
  let id = ObjectId(req.params.id);
  update(id,null,'ACTIVATE',res)  
};
exports.updatePostulante = (req, res, next) => {
  console.log("Update postulante req.userId", req.userId);
  console.log("Update postulante body", req.body);
  let id = ObjectId(req.userId);
  let postulanteData = req.body;
  if(postulanteData){
    update(id,postulanteData,'UPDATE',res)
  }else{
    // To Do: this case could be validated in the route definition
    res.status(404).send({success: false, message: 'NO_DATA_RECEIVED'});
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
