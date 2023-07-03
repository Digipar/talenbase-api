import cryptoJs from 'crypto-js';
import { SPR } from "../connection/connection.js";
const TOKEN_SECRET = process.env.TOKEN_SECRET || null;
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
const { AES, enc } = cryptoJs
const passwordKey = 'T@L3NB@S3'

import {
    SHAREPOINT_API,
} from "../config/config.js";

const login = async (req, res) => {
    console.log('req.body :>> ', req.body);
    try {
        const result = await SPR.get(
            SHAREPOINT_API +
            `web/lists/GetByTitle(\'Colaborador\')/items?$select=*,Id,Title,Email,Contrasenha&$filter=Email eq '${req.body.email}'`
        );
        console.log('result.body.d.results', result.body.d.results)

        if (result.body.d.results.length) {

            const decryptPass = AES.decrypt(req.body.Pin,passwordKey).toString(enc.Utf8)
            
            if (decryptPass !== result.body.d.results[0].Contrasenha) {
                return res.status(401).json({ message: "usuario o contraseña incorrectos" });
            }

            const token = sign({ id: result.body.d.results[0].Id }, TOKEN_SECRET, {
                expiresIn: 86400, // 24 hours 
            });

            const data = {
                name: result.body.d.results[0].Title,
                Correo: result.body.d.results[0].EmailPersonal,
                accessToken: token,
                colaboradorId: result.body.d.results[0].Id
            }
            return res.status(200).json(data);
        } else {
            return res.status(401).json({ message: "usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({ message: error.message });
    }
};

export { login };
