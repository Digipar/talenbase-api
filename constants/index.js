import cryptoJs from "crypto-js";
import { APP_HOST } from "../config/config.js"

const buildLink = (email) => {
  const fechaDDMMYYYY = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  console.log('fechaDDMMYYYY', fechaDDMMYYYY)
  const hashedEmail = cryptoJs.MD5(`${email}${fechaDDMMYYYY}`).toString();
  const link = new URL(`https://${APP_HOST}/reset-password`);
  link.searchParams.append('hash', hashedEmail);
  link.searchParams.append('email', email);
  return link;
};

export const getPasswordResetText = (email) => {
  const link = buildLink(email);
  return `
Por favor use el siguiente link para cambiar su contraseña: 
${link}
Si no solicitó un cambio de contraseña, puede ignorar este mensaje.
Por favor, no responda a este correo electrónico.

Atentamente,

Equipo de soporte de Agrofertil`};
export const getPasswordResetHtml = (email) => {
  const link = buildLink(email);
  return `
  Por favor use el siguiente link para cambiar su contraseña: <br/>
  ${link} <br/>
  Si no solicitó un cambio de contraseña, puede ignorar este mensaje.<br/>
  Por favor, no responda a este correo electrónico.<br/>
  <br/>
  Atentamente,<br/>
  
  Equipo de soporte de Agrofertil`;
}

