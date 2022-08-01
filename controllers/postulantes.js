const ObjectId = require('mongodb').ObjectID;
const Postulante = require('../models/postulante');

exports.addPostulante = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const postulante = new Postulante(email, password,'','','','','','','','','','',false,'');
  postulante.save()
    .then(result => {
      console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
      console.log(err.code);
      res.status(500).json({success: false, message: 'Error de comunicación con el servidor'});
    });
};

exports.activatePostulante = (req, res, next) => {
  console.log('Activar postulante req.params.id', req.params.id)
  Postulante
    .findById(req.params.id)
    .then(postulante => {
      console.log('postulante', postulante)
      // res.status(200).json(postulante);
    })
    .catch(err => console.log(err));
};

exports.editProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  
  const product = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDesc, new ObjectId(prodId));
  product.save()
  .then(productData => {
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getPostulantes = (req, res, next) => {
  Postulante
    .fetchAll()
    .then(postulante => {
      res.status(200).json(postulante);
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
