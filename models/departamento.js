const ObjectId = require('mongodb').ObjectId; 
const getDB = require('../util/database').getDb;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';

class Departamento {
  static fetchAll() {
    const db=getDB();
    return db.collection('departamentos')
      .find()
      .toArray()
      .then(departamentos => {
        console.log(departamentos);
        return departamentos;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    console.log('go to find:', id)
    const db=getDB();
    return db.collection('departamentos')
      .find({_id: id})
      .next()
      .then(departamento => {
        console.log('find departamento: ',departamento);
        return departamento;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }
  static findByEmail(email) {
    console.log('go to find:', email)
    const db=getDB();
    return db.collection('departamentos')
      .find({email: email})
      .next()
      .then(departamento => {
        return departamento;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }

  static find(filter) {
    console.log('go to find:', filter)
    const db=getDB();
    return db.collection('departamentos')
      .find(filter)
      .next()
      .then(departamento => {
        console.log('find departamento: ',departamento);
        return departamento;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }

  

}

module.exports = Departamento;
