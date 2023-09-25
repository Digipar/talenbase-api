import { SPR } from "../connection/connection.js";
import { SHAREPOINT_API, SITE_URL } from "../config/config.js";
import moment from "moment-timezone";
import cryptoJs from "crypto-js";
import bcrypt from "bcryptjs";

export const getCandidato = async (req, res, next) => {
  try {
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'Candidato\')/items?$select=*,Id,Title,Email,Contrasenha,Nacionalidad,FechaNacimiento,EstadoCivil,Telefono&$filter=Email eq '${req.params.email}'`
    );
    if (result.body?.d?.results?.length) {
      return res.status(200).json(result.body.d.results[0]);
    } else {
      return res.status(204).json({ message: "Candidato no Existe" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCandidatoIdioma = async (req, res, next) => {
  try {
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'CandidatoIdioma\')/items?$select=*,Id,Title,Nivel,IdiomaId,Idioma/Title&$expand=Idioma&$filter=CandidatoId eq '${req.params.id}'`
    );
    if (result.body?.d?.results?.length) {
      return res.status(200).json(result.body.d.results);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.log("getCandidatoIdioma error",error)
    res.status(500).json({ message: error.message });
  }
};
export const getCandidatoExperienciaLaboral = async (req, res, next) => {
  try {
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'CandidatoExperienciaLaboral\')/items?$select=*&$filter=CandidatoId eq '${req.params.id}'`
    );
    if (result.body?.d?.results?.length) {
      return res.status(200).json(result.body.d.results);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCandidatoReferenciaPersonal = async (req, res, next) => {
  try {
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'CandidatoReferenciaPersonal\')/items?$select=*&$filter=CandidatoId eq '${req.params.id}'`
    );
    if (result.body?.d?.results?.length) {
      return res.status(200).json(result.body.d.results);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCandidato = async (req, res, next) => {
  try {
    const digest = await SPR.requestDigest(SITE_URL);

    let body = {
      __metadata: { type: "SP.Data.CandidatoListItem" },
      Title: `${req.body.Title}`,
      NombreApellido: req.body.NombreApellido,
      FechaNacimiento: moment
        .tz(req.body.FechaNacimiento, "America/Asuncion")
        .toISOString(),
      Nacionalidad: req.body.Nacionalidad,
      EstadoCivil: req.body.EstadoCivil,
      DomicilioPais: req.body.DomicilioPais,
      DomicilioDepartamento: req.body.DomicilioDepartamento,
      DomicilioCiudad: req.body.DomicilioCiudad,
      DomicilioDireccion: req.body.DomicilioDireccion,
      Telefono: req.body.Telefono,
      Email: req.body.Email,
      Sexo: req.body.Sexo,
    };
    const reqOptions = {
      headers: {
        "X-RequestDigest": digest,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "If-Match": "*",
        "X-HTTP-Method": "MERGE",
      },
      body: body,
    };
    const result = await SPR.post(
      `${SHAREPOINT_API}web/lists/GetByTitle('Candidato')/items(${req.body.Id})`,
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
    console.log("error :>> ", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAcademicData = async (req, res, next) => {
  try {
    const digest = await SPR.requestDigest(SITE_URL);
    let body = {
      __metadata: { type: "SP.Data.CandidatoListItem" },
      FormacionAcademica: req.body.FormacionAcademica,
      CursandoActual: req.body.CursandoActual,
      EgresoAnio: `${req.body.EgresoAnio}`,
      TituloObtenido: req.body.TituloObtenido,
      Posgrado: req.body.Posgrado,
      PosgradoEn: req.body.PosgradoEn,
      Institucion: req.body.Institucion,
      FormacionPais: req.body.FormacionPais,
      FormacionCiudad: req.body.FormacionCiudad,
      ConocimientoInformatica: req.body.ConocimientoInformatica,
    };
    const reqOptions = {
      headers: {
        "X-RequestDigest": digest,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "If-Match": "*",
        "X-HTTP-Method": "MERGE",
      },
      body: body,
    };
    const result = await SPR.post(
      `${SHAREPOINT_API}web/lists/GetByTitle('Candidato')/items(${req.body.Id})`,
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
    console.log("error :>> ", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateLanguageData = async (req, res, next) => {
  try {
    const digest = await SPR.requestDigest(SITE_URL);
    console.log("req.body.language",req.body.language)
    await req.body.language.forEach(async (idioma) => {
      let body = {
        __metadata: { type: "SP.Data.CandidatoIdiomaListItem" },
        Title: idioma.value,
        Nivel: idioma.nivel,
        CandidatoId: idioma.colaboradorId,
        IdiomaId: idioma.idiomaId,
      };
      const reqOptions = {
        headers: {
          "X-RequestDigest": digest,
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "If-Match": "*",
          "X-HTTP-Method": "MERGE",
        },
        body: body,
      };
      const result = await SPR.post(
        `${SHAREPOINT_API}web/lists/GetByTitle('CandidatoIdioma')/items(${idioma.id})`,
        reqOptions
      );
      console.log("updateLanguageData result statusCode", result.statusCode)
      if (result.statusCode >= 400 && result.statusCode <= 500) {
        throw new Error("Bad fetch response CandidatoIdiomaUpdate", {
          statusCode: result.statusCode,
          statusMessage: result.statusMessage,
        });
      }
    });
    res.status(200).json("OK");
  } catch (error) {
    console.log("updateLanguageData error", error);
    res.status(500).json({ message: error.message });
  }
};
export const updatePreviousExperience = async (req, res, next) => {
  try { 
    const digest = await SPR.requestDigest(SITE_URL);
    let body = {
      __metadata: { type: "SP.Data.CandidatoExperienciaLaboralListItem" },
      Title: req.body.Title,
      Cargo: req.body.Cargo,
      FechaDesde: req.body.FechaDesde
        ? moment.tz(req.body.FechaDesde, "America/Asuncion").toISOString()
        : null,
      FechaHasta: req.body.FechaHasta
        ? moment.tz(req.body.FechaHasta, "America/Asuncion").toISOString()
        : null,
      ActividadDesarrollada: req.body.ActividadDesarrollada,
      MotivoSalida: req.body.MotivoSalida,
      ReferenciaLaboralNombre: req.body.ReferenciaLaboralNombre,
      ReferenciaLaboralTelefono: req.body.ReferenciaLaboralTelefono,
      ReferenciaLaboralEmail: req.body.ReferenciaLaboralEmail,
      Pasantia: req.body.Pasantia  ,
      CandidatoId: req.body.colaboradorId,
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
      `${SHAREPOINT_API}web/lists/GetByTitle('CandidatoExperienciaLaboral')/items`,
      reqOptions
    );
    if (result.statusCode >= 400 && result.statusCode <= 500) {
      throw new Error("Bad fetch response CandidatoExperienciaLaboralUpdate", {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
      });
    }
    const dataToSend = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'CandidatoExperienciaLaboral\')/items?$select=*&$filter=CandidatoId eq '${req.body.colaboradorId}'`
    );
    if (dataToSend.body?.d?.results?.length) {
      return res.status(200).json(dataToSend.body.d.results);
    } else {
      throw new Error("No data found", {
        statusCode: dataToSend.statusCode,
        statusMessage: dataToSend.statusMessage,
      });
    }
 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePreviousExperience = async (req, res, next) => {
  try { 
    const digest = await SPR.requestDigest(SITE_URL);
  
    const reqOptions = {
      headers: {
        "X-RequestDigest": digest,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "IF-MATCH": "*",
        "X-HTTP-Method": "DELETE",
      }
    };
    const result = await SPR.post(
      `${SHAREPOINT_API}web/lists/GetByTitle('CandidatoExperienciaLaboral')/items(${req.params.id})`,
      reqOptions
    );
    if (result.statusCode >= 400 && result.statusCode <= 500) {
      throw new Error("Bad fetch response CandidatoExperienciaLaboralUpdate", {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
      });
    }
    

    res.status(result.statusCode).json(result.statusMessage);
  } catch (error) {
    console.log("error :>> ", error)
    res.status(500).json({ message: error.message });
  }
};

export const updatePersonalReference = async (req, res, next) => {
  try { 
    const digest = await SPR.requestDigest(SITE_URL);
    let body = {
      __metadata: { type: "SP.Data.CandidatoReferenciaPersonalListItem" },
      Title: req.body.Title,
      Telefono: req.body.Telefono,
      CandidatoId: req.body.colaboradorId, 
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
      `${SHAREPOINT_API}web/lists/GetByTitle('CandidatoReferenciaPersonal')/items`,
      reqOptions
    );
    if (result.statusCode >= 400 && result.statusCode <= 500) {
      throw new Error("Bad fetch response CandidatoExperienciaLaboralUpdate", {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
      });
    }
    const dataToSend = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'CandidatoReferenciaPersonal\')/items?$select=*&$filter=CandidatoId eq '${req.body.colaboradorId}'`
    );
    if (dataToSend.body?.d?.results?.length) {
      return res.status(200).json(dataToSend.body.d.results);
    } else {
      throw new Error("No data found", {
        statusCode: dataToSend.statusCode,
        statusMessage: dataToSend.statusMessage,
      });
    }
 
  } catch (error) {
    console.log("error :>> ", error)
    res.status(500).json({ message: error.message });
  }
};
export const deletePersonalReference = async (req, res, next) => {
  try { 
    const digest = await SPR.requestDigest(SITE_URL);
  
    const reqOptions = {
      headers: {
        "X-RequestDigest": digest,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "IF-MATCH": "*",
        "X-HTTP-Method": "DELETE",
      }
    };
    const result = await SPR.post(
      `${SHAREPOINT_API}web/lists/GetByTitle('CandidatoReferenciaPersonal')/items(${req.params.id})`,
      reqOptions
    );
    if (result.statusCode >= 400 && result.statusCode <= 500) {
      throw new Error("Bad fetch response CandidatoReferenciaPersonalUpdate", {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
      });
    }
    res.status(result.statusCode).json(result.statusMessage);
  } catch (error) {
    console.log("error :>> ", error)
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartments =  async(req,res)=>{
  try {
    const digest = await SPR.requestDigest(SITE_URL); 
    let body = {
      __metadata: { type: "SP.Data.CandidatoListItem" },
      Departamento1Id: req.body.data[0].Id,
      Departamento2Id: req.body.data.length > 1 ? req.body.data[1].Id : null,
      Departamento3Id: req.body.data.length > 2 ? req.body.data[2].Id : null,
    };
    const reqOptions = {
      headers: {
        "X-RequestDigest": digest,
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "If-Match": "*",
        "X-HTTP-Method": "MERGE",
      },
      body: body,
    };
    const result = await SPR.post(
      `${SHAREPOINT_API}web/lists/GetByTitle('Candidato')/items(${req.body.colaboradorId})`,
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
    console.log("error :>> ", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCandidatoPassword = async (req, res, next) => {
  console.log('req.body', req.body)
  // destructure, and check if email exists in sharepoint Candidato list
  const fechaDDMMYYYY = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const { email, passwordResetHash, password } = req.body;
  if(!email){
    return res.status(200).json({
      success: false,
      message: "Email no recibido",
    });
  }
  // 1- seek the user exists in the sharepoint list
  let candidato;
  try{
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'Candidato\')/items?$select=Id,NombreApellido&$filter=Email eq '${email}'`
    );
    if (result.body?.d?.results?.length) { 
      candidato = result.body.d.results[0];
    } else {
      console.log('Candidato not found');
      return res.status(200).json({
        success: false,
        message: "Email inválido",
      });
    }
  }
  
  catch(error){
    console.log('error updateCandidatoPassword part 1', error);
    return res.status(200).json({
      success: false,
      message: "Email inválido",
    });
  }
  // 2- validate 
  const hashedEmail = cryptoJs.MD5(`${email}${fechaDDMMYYYY}`).toString();
  if(hashedEmail !== passwordResetHash){
    return res.status(200).json({
      success: false,
      message: "Código inválido",
    });
  }
  // 3- update password
  const digest = await SPR.requestDigest(SITE_URL);
  let body = {
    __metadata: { type: "SP.Data.CandidatoListItem" },
    Contrasenha: password
  };

  const reqOptions = {
    headers: {
      "X-RequestDigest": digest,
      Accept: "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      "If-Match": "*",
      "X-HTTP-Method": "MERGE",
    },
    body: body,
  };
  const result = await SPR.post(
    `${SHAREPOINT_API}web/lists/GetByTitle('Candidato')/items(${candidato.Id})`,
    reqOptions
  );
  console.log("updateCandidatoPassword result", result.statusCode)
  if (result.statusCode !== 204) {
    console.log('result', result);
    return res.status(200).json({
      success: false,
      message: "Contraseña no pudo ser cambiada. Intente nuevamente.",
    });
  // if (result.statusCode >= 400 && result.statusCode <= 500) {
  //   throw new Error("Bad fetch response CandidatoUpdate", {
  //     statusCode: result.statusCode,
  //     statusMessage: result.statusMessage,
  //   });
  }
  // 4- return success
  return res.status(200).json({
    success: true,
    message: "Contraseña cambiada exitosamente",
  });
};