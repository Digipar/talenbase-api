const ObjectId = require('mongodb').ObjectId;
const getDB = require('../util/database').getDb;
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';

class Mailer {
    constructor(tipo, direccion, candidatoId, host) {
        this.fechaHora = 'dd/mm/yyyy';
        this.tipo = tipo;
        this.encabezado = 'Talenbase';
        this.cuerpo = `Bienvenido a Talenbase, para activar su cuenta ingrese a ` +`http://${host}/activate-account/${candidatoId}`+ `\n\n*** ESTE ES UN EMAIL GENERADO AUTOMÁTICAMENTE. NO RESPONDA  AL MISMO ***`;
        this.direccion = direccion;
        this.estado = 2;
        this.candidatoId = candidatoId;
    }
    
    save() {
        console.log('first', this.candidatoId)
        const db = getDB();
        let dbOp;
        let message;
        console.log('this._id antes de entrar', this._id)
        // Insert the mail
        dbOp = db.collection('mailer')
            .insertOne(this);

        return dbOp
            .then(result => {
                console.log('result mailer',result);
                console.log('this._id ya en el result', this._id.toString())
                return { success: true, message: message, id: this._id.toString() };
            })
            .catch(err => {
                console.log('err', err)
                const message = err.code === 11000 ? 'EMAIL_DUPLICATED' : 'UNKNOW_ERROR_SAVING_IN_MAILER';
                return { success: false, message };
            });
    };
}

module.exports = Mailer;
