import { Router } from 'express';
const authRouter = Router();
import { login,register } from '../controllers/auth.js';

authRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
authRouter.post("/login",login);
authRouter.post("/register", register);
/* TO DO: move this route to auth.js */
/* TO DO: move this route to auth.js */
// authRouter.put('/activate/:id([0-9a-fA-F]{24})?', candidatosController.activate);

// authRouter.use(function(req, res, next) {
//   console.log('error 404');
//   res.status(404).send({success: false, message: 'No encontrado'});
// });
//   router.post("/logout", controller.signout);
export default authRouter
