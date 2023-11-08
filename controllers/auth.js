import cryptoJs from 'crypto-js';
import { SPR } from "../connection/connection.js";
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken; 
import { SHAREPOINT_API, SITE_URL, TOKEN_SECRET } from "../config/config.js";



const login = async (req, res) => {
  try {
    const result = await SPR.get(
      SHAREPOINT_API +
      `web/lists/GetByTitle(\'Candidato\')/items?$select=*,Id,Title,NombreApellido,Email,Contrasenha&$filter=Email eq '${req.body.email}'`
    );
    if (result.body.d.results.length) {
 

      if (req.body.password !== result.body.d.results[0].Contrasenha) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }

      const token = await sign({ id: result.body.d.results[0].Id }, TOKEN_SECRET, {
        expiresIn: 86400, // 24 hours 
      });

      const data = {
        name: result.body.d.results[0].NombreApellido,
        email: result.body.d.results[0].Email,
        accessToken: token,
        colaboradorId: result.body.d.results[0].Id
      }
      return res.status(200).json(data);
    } else {
      return res.status(401).json({ message: "usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.log('error :>> ', error.message);
    return res.status(500).json({ message: error.message });
  }
};
const register = async (req, res) => {

  try {

    // first check if the user already exists

    const user = await SPR.get(
      SHAREPOINT_API +
      `web/lists/GetByTitle(\'Candidato\')/items?$select=*,Id,Title,Email,Contrasenha,Nacionalidad,FechaNacimiento,EstadoCivil,Telefono&$filter=Email eq '${req.body.email}'`
    );
    if (user.body?.d?.results?.length) {
      return res.status(409).json({ message: "Cuenta ya Existe" });
    }



    const digest = await SPR.requestDigest(SITE_URL);


    let body = {
      __metadata: { type: "SP.Data.CandidatoListItem" },
      Title: '',
      NombreApellido: req.body.nombreCompleto,
      Email: req.body.email,
      Contrasenha: req.body.password,
      Sexo: '',
      Posgrado: 'false',
      CursandoActual: 'false'
    };
    const reqOptions = {
      headers: {
        "X-RequestDigest": digest,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-HTTP-Method": "POST",
      },
      body: body,
    };
    const result = await SPR.post(
      `${SHAREPOINT_API}web/lists/GetByTitle('Candidato')/items`,
      reqOptions
    );
     
    if (result.statusCode >= 400 && result.statusCode <= 500) {
      throw new Error("Bad fetch response CandidatoUpdate", {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
      });
    }
    res.status(result.statusCode).json(result.statusMessage);
  } catch (error) {
     

    res.status(500).json({ message: error.message });
  }
}

export { login, register };
