const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
router.post("/login", authController.login);
router.use(function(req, res, next) {
  console.log('error 404');
  res.status(404).send({success: false, message: 'No encontrado'});
});
//   router.post("/logout", controller.signout);

module.exports = router;
