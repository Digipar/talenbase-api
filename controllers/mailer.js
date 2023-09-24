import { SPR } from "../connection/connection.js";
import { SHAREPOINT_API, SITE_URL, SENDGRID_API_KEY } from "../config/config.js";
import sgMail from '@sendgrid/mail';
import {getPasswordResetHtml, getPasswordResetText} from '../constants/index.js';

sgMail.setApiKey(SENDGRID_API_KEY);
const registerMailerActivateAccount = async (req, res) => {
  const email = req.body.email;
  if(!email){
    return res.status(200).json({
      success: false,
      message: "Email no recibido",
    });
  }
  // 1- seek the user exists in the sharepoint list
  try{
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'Candidato\')/items?$select=Id,NombreApellido&$filter=Email eq '${email}'`
    );
    if (result.body?.d?.results?.length) {
      console.log('Candidato found: ', result.body.d.results[0])
      
    } else {
      console.log('Candidato not found');
      return res.status(200).json({
        success: false,
        message: "Email inválido",
      });
    }
  }
  catch(error){
    console.log('error', error);
    return false;
  }
  // 2- send email
  if (result.body?.d?.results?.length) {
    console.log('Candidato found: ', result.body.d.results[0])
    // 2- send email
    const msg = {
      to: email,
      from: 'noreply@digipar.com',
      subject: 'Activación de cuenta de AGROFERTIL [Talenbase]',
      text: `
      Por favor use el siguiente link para activar su cuenta:
      `,
      html: `
      Por favor use el siguiente link para activar su cuenta: <br/>
      `
    };
    try {
      sgMail.send(msg);
    }
    catch(error){
      console.log('error', error);
      return res.status(200).json({
        success: false,
        message: "Email no pudo ser enviado. Intente nuevamente.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Email de activación de cuenta enviado",
    });
  }     
}

const registerMailerResetPass = async (req, res) => {
  const email = req.body.email;
  if(!email){
    return res.status(200).json({
      success: false,
      message: "Email no recibido",
    });
  }
  // 1- seek the user exists in the sharepoint list
  try{
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'Candidato\')/items?$select=Id,NombreApellido&$filter=Email eq '${email}'`
    );
    if (result.body?.d?.results?.length) {
      console.log('Candidato found: ', result.body.d.results[0])
      
    } else {
      console.log('Candidato not found');
      return res.status(200).json({
        success: false,
        message: "Email inválido",
      });
    }
  }
  catch(error){
    console.log('error', error);
    return false;
  }
  // 2- send email
  const msg = {
    to: email,
    from: 'noreply@digipar.com',
    subject: 'Cambio de contraseña de AGROFERTIL [Talenbase]',
    text: getPasswordResetText(email),
    html: getPasswordResetHtml(email),
  };
  try {
    sgMail.send(msg);
  }catch(error){
    console.log('error', error);
    return res.status(200).json({
      success: false,
      message: "Email no pudo ser enviado. Intente nuevamente.",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Email de cambio de contraseña enviado",
  });
}

export  {
  registerMailerActivateAccount,
  registerMailerResetPass
}