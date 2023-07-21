import { SPR } from "../connection/connection.js";
import { SHAREPOINT_API, SITE_URL } from "../config/config.js";
const selectString = `$select=*,AprobadoPorRRHH/UserName,AprobadoPorRRHH/LastName,AprobadoPorRRHH/FirstName,Encargado/UserName,Encargado/LastName,Encargado/FirstName,ResponsableSeleccion/UserName,ResponsableSeleccion/LastName,ResponsableSeleccion/FirstName,Departamento/Title`;
const expandString = `&$expand=AprobadoPorRRHH,Encargado,ResponsableSeleccion,Departamento`;
import moment from "moment";


const getSolicitudes = async (url, array) => {
    const result = await SPR.get(url);
    array.push(...result.body.d.results);
    if (result.body.d.__next) {
        await getSolicitudes(result.body.d.__next);
    } else {
        return array;
    }
};

const getAll = async (req, res) => {
    try {
        const solicitudArray = [];
        const url = `${SHAREPOINT_API}web/lists/GetByTitle(\'Solicitud\')/items?${selectString}${expandString}`;
        await getSolicitudes(url, solicitudArray); 
        res.status(200).json(solicitudArray);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getSolicitud = async (req, res) => {
    try { 
        const filter=`Id eq ${req.params.Id}`
        const solicitudArray = [];
        const url = `${SHAREPOINT_API}web/lists/GetByTitle(\'Solicitud\')/items?${selectString}${expandString}&$filter=${filter}`;
        await getSolicitudes(url, solicitudArray);
        
        res.status(200).json(solicitudArray[0]);
    } catch (error) {
        res.status(500).json(error);
    }
};

const findSolicitudAbierta = async (req, res) => {
    try {
        const filter =`FechaFinSeleccion ge '${moment().format('YYYY-MM-DD')}'`
        const solicitudesAbiertasArray = [];
        const url = `${SHAREPOINT_API}web/lists/GetByTitle(\'Solicitud\')/items?${selectString}${expandString}&$filter=${filter}`;
        await getSolicitudes(url, solicitudesAbiertasArray);
        res.status(200).json(solicitudesAbiertasArray);
    } catch (error) {
        res.status(500).json(error);
    }
};


export { getAll, findSolicitudAbierta, getSolicitud };