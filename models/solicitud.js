const ObjectId = require('mongodb').ObjectId; 
const getDB = require('../util/database').getDb;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';

class Candidato {
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
  static findByEmail(email) {
    console.log('go to find:', email)
    const db=getDB();
    return db.collection('solicitudes')
      .find({email: email})
      .next()
      .then(solicitud => {
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

  

}

module.exports = Candidato;
