import { SPR } from "../connection/connection.js";
import { SHAREPOINT_API, SITE_URL } from "../config/config.js";
const selectString = `$select=*`;
const expandString = ``;

const getPostulantesSolicitudes = async (url, array) => {
  const result = await SPR.get(url);
  array.push(...result.body.d.results);
  if (result.body.d.__next) {
    await getPostulantesSolicitudes(result.body.d.__next);
  } else {
    return array;
  }
};
const getPostulanteSolicitudByCandidatoId = async (req, res) => {
  try { 
    const filter = `CandidatoId eq ${req.body.CandidatoId}`
    const solicitudesAbiertasArray = [];
    const url = `${SHAREPOINT_API}web/lists/GetByTitle(\'PostulanteSolicitud\')/items?${selectString}${expandString}&$filter=${filter}`;
 
    await getPostulantesSolicitudes(url, solicitudesAbiertasArray);
    res.status(200).json(solicitudesAbiertasArray);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
const registerPostulacion = async(req,res)=>{

  try {
    const user = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'Candidato\')/items?$select=*,Id,Title&$filter=Id eq ${req.body.CandidatoId} `
    ); 
    if (user.body?.d?.results[0].Title === null) {
      res.status(500).json({
        success: false,
        message: "NO PERSONAL DATA"
      });
      return ;
    }

    const body = {
      __metadata: { type: "SP.Data.PostulanteSolicitudListItem" }, 
      CandidatoId: req.body.CandidatoId,
      SolicitudId: req.body.SolicitudId,
      Title:user.body.d.results[0].Title
    };
    const digest = await SPR.requestDigest(SITE_URL);

    const reqOptions = {
      headers: {
        "X-RequestDigest": digest,
        "X-HTTP-Method": "POST",
        "Content-Type": "application/json;odata=verbose",
        "Accept": "application/json;odata=verbose"
      },
      body: body
    };

    const result = await SPR.post(
      `${SHAREPOINT_API}web/lists/GetByTitle(\'PostulanteSolicitud\')/items`,
      reqOptions
    );

    if (result.statusCode >= 400 && result.statusCode <= 500) {
      throw new Error("Bad fetch response registerPostulacion", {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
      });
    }

    res.status(result.statusCode).json(result.statusMessage);
    
  } catch (error) {
    console.log("error :>> ", error) 
    res.status(500).json({ message: error.message });
  }
}
export { getPostulanteSolicitudByCandidatoId,registerPostulacion }

 