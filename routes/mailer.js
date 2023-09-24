import { Router } from 'express';
import {registerMailerActivateAccount, registerMailerResetPass} from '../controllers/mailer.js'

const mailerRouter = Router();

mailerRouter.post('/register-mailer-reset-pass', registerMailerResetPass);
mailerRouter.post('/register-mailer-activate-account', registerMailerActivateAccount);

mailerRouter.use(function(req, res, next) {
    console.log('error 404 por código inválido');
    res.status(404).send({success: false, message: 'Código inválido'});
});

export default mailerRouter;
