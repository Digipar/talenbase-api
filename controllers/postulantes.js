const ObjectId = require('mongodb').ObjectID;
const Postulante = require('../models/postulante');

exports.addPostulante = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const postulante = new Postulante(title, imageUrl, price, description);
  postulante.save()
    .then(result => {
      // console.log(result);
      console.log('Postulante created!');
    //   res.redirect('/admin/products');
        res.status(200).end()
    })
    .catch(err => {
      console.log(err);
    });
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
