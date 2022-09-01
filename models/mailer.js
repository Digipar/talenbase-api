const ObjectId = require('mongodb').ObjectId;
const getDB = require('../util/database').getDb;
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';
const moment = require('moment');
class Mailer {
    constructor(tipo, direccion, candidatoId, cuerpo) {
        this.fechaHora = moment().format('YYYY-MM-DD HH:mm:ss');
        this.tipo = tipo;
        this.encabezado = tipo == 'ACTIVACION' ? 'Activación de cuenta - Talenbase' : 'Recueración de cuenta - Talenbase';
        this.cuerpo = cuerpo;
        this.direccion = direccion;
        this.estado = 2;
        this.candidatoId = candidatoId;
    }
    
    save() {
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
                const message = err.code === 11000 ? 'Email duplicado' : 'Error desconocido al grabar en mailer';
                return { success: false, message };
            });
    };
}

module.exports = Mailer;
