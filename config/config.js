import { config } from 'dotenv';
config();
export const SITE_URL = process.env.SITE_URL;
export const SHAREPOINT_API = process.env.SHAREPOINT_API;
export const PORT = process.env.PORT;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
