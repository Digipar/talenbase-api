import sprequest from "sp-request";
import { CLIENT_ID, CLIENT_SECRET } from "../config/config.js";

const creds = {
  clientId:CLIENT_ID,
  clientSecret:CLIENT_SECRET
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const SPR = sprequest.create(creds);
export {SPR} ;
