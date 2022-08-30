const ObjectId = require('mongodb').ObjectId;
const getDB = require('../util/database').getDb;
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';

class Postulacion {
    constructor(solicitudId, candidatoId) {
        this.solicitudId = solicitudId;
        this.candidatoId = candidatoId;
        this.sharepointId = '';
    }

    save() {
        const db = getDB();
        let dbOp;
        let message;
        console.log('this._id antes de entrar', this._id)
        // Insert the postulacion
        dbOp = db.collection('postulacion')
            .insertOne(this);

        return dbOp
            .then(result => {
                console.log(result);
                console.log('this._id ya en el result', this._id.toString())
                return { success: true, message: message, id: this._id.toString() };
            })
            .catch(err => {
                console.log('err', err)
                const message = err.code === 11000 ? 'Email duplicado' : 'Error al grabar';
                return { success: false, message };
            });
    };

    static findByCandidatoId(id) {
        const db = getDB();
        return db.collection('postulacion')
            .find({ candidatoId: id })
            .toArray()
            .then(postulaciones => {
                // console.log(postulaciones);
                return postulaciones;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByFilter(filter) {
        const db = getDB();
        return db.collection('postulacion')
            .find(filter)
            .toArray()
            .then(postulaciones => {
                // console.log(postulaciones);
                return postulaciones;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = Postulacion;
