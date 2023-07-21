import { SPR } from "../connection/connection.js";
import { SHAREPOINT_API, SITE_URL } from "../config/config.js";


export const getAll = async (req, res) => {
    try {
      const result = await SPR.get(
        SHAREPOINT_API +
          `web/lists/GetByTitle(\'Departamento\')/items?$select=*`
      );
      if (result.body?.d?.results?.length) {
        return res.status(200).json(result.body.d.results);
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
        res.status(500).json(error);
    }
}; 
export const getDepartmentsByCandidato = async (req, res) => {
  try {
    const result = await SPR.get(
      SHAREPOINT_API +
        `web/lists/GetByTitle(\'Candidato\')/items?$select=*,Id,Departamento1Id,Departamento1/Title,Departamento2Id,Departamento2/Title,Departamento3Id,Departamento3/Title&$expand=Departamento1,Departamento2,Departamento3&$filter=Id eq '${req.params.id}'`
    );
    const body = result.body.d.results[0];
    const departamentosAEnviar = [];
    if (body.Departamento1Id) {
      departamentosAEnviar.push({
        Id: body.Departamento1Id,
        Title: body.Departamento1.Title,
        Selected: true,
      })
    }
    if (body.Departamento2Id) {
      departamentosAEnviar.push({
        Id: body.Departamento2Id,
        Title: body.Departamento2.Title, 
        Selected: true
      })
    }
    if (body.Departamento3Id) {
      departamentosAEnviar.push({
        Id: body.Departamento3Id,
        Title: body.Departamento3.Title,
        Selected: true
      })
    }
     
    return res.status(200).json(departamentosAEnviar);
     
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: error.message });
  }
}; 

