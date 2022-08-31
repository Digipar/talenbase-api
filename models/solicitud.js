const ObjectId = require('mongodb').ObjectId; 
const getDB = require('../util/database').getDb;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';

class Solicitud {
  static fetchAll() {
    const db=getDB();
    return db.collection('solicitudes')
      .find()
      .toArray()
      .then(solicitudes => {
        console.log(solicitudes);
        return solicitudes;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    console.log('go to find:', id)
    const db=getDB();
    return db.collection('solicitudes')
      .find({_id: id})
      .next()
      .then(solicitud => {
        console.log('find solicitud: ',solicitud);
        return solicitud;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }
  static findBySpId(spId) {
    console.log('go to find:', spId)
    const db=getDB();
    return db.collection('solicitudes')
      .find({sharepointId: Number(spId)})
      .next()
      .then(solicitud => {
        console.log('solicitud found', solicitud)
        return solicitud;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }

  static find(filter) {
    console.log('go to find:', filter)
    const db=getDB();
    return db.collection('solicitudes')
      .find(filter)
      .next()
      .then(solicitud => {
        console.log('find solicitud: ',solicitud);
        return solicitud;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }

  static findByFilter(filter) {
    console.log('filter', filter)
    const db = getDB();
    return db.collection('solicitudes')
        .find(filter)
        .toArray()
        .then(solicitud => {
            console.log(solicitud);
            return solicitud;
        })
        .catch(err => {
            console.log(err);
        });
}
  

}

module.exports = Solicitud;
