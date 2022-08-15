require('dotenv').config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || null;

const User = require("../models/Postulante");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email
    });
    // const user = null;
    if (!user) {
      return res.status(404).send({ message: "EMAIL_UNKNOW" });
    }
    // const passwordIsValid = false;

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "INVALID_PASSWORD",
      });
    }
    
    if (!user.emailValidated) {
      return res.status(401).send({
        message: "EMAIL_NOT_VALIDATED",
      });
    }
    console.log('user to sign', user)
    const token = jwt.sign({ id: user._id }, TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    // req.session.token = token;
    
    return res.status(200).send({
      // id: user._id,
      username: user.email,
      email: user.email,
      name: user.nombreCompleto,
      accessToken: token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const nombreCompleto = req.body.nombreCompleto;

  const user = new User(
    null,email,password,"",nombreCompleto,
    "","","","","","",
    "",    "",    "",    false,
    "",  [],    [],    [],    [],  []
  );
  user.save()
    .then((result) => {
      console.log(result);
      console.log(`http://${process.env.APP_HOST}/activate-account/${result.id}`);
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


// exports.signout = async (req, res) => {
//   try {
//     req.session = null;
//     return res.status(200).send({
//       message: "You've been signed out!"
//     });
//   } catch (err) {
//     this.next(err);
//   }
// }; 