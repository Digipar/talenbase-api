const ObjectId = require('mongodb').ObjectId; 
const getDB = require('../util/database').getDb;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const DBSYSTEM = process.env.DBSYSTEM || 'MONGODB';

class Candidato {
  constructor(id,email, password, docNro, nombreCompleto, estadoCivil, sexo, fechaNacimiento, 
    nacionalidad,telefono,direccion,pais,departamento,ciudad, emailValidated,sharepointId,academicData,language,personalReference,experience,department,actualizar) {
    this._id = id ?  (DBSYSTEM === 'COSMODB' ? id : ObjectId(id)) : null;
    this.email = email;
    this.password = password;
    this.docNro = docNro;
    this.nombreCompleto = nombreCompleto;
    this.estadoCivil = estadoCivil;
    this.sexo = sexo;
    this.fechaNacimiento = fechaNacimiento;
    this.nacionalidad = nacionalidad;
    this.telefono = telefono;
    this.direccion = direccion;
    this.pais = pais;
    this.departamento = departamento;
    this.ciudad = ciudad;
    this.emailValidated = emailValidated;
    this.sharepointId = sharepointId;
    this.academicData = academicData;
    this.language = language;
    this.personalReference = personalReference;
    this.experience = experience;
    this.department = department;
    this.actualizar = actualizar;
  }

  save() {
    const db=getDB();
    let dbOp;
    let message;
    console.log('this._id antes de entrar', this._id)
    if(this._id){
      message = `Registro actualizado exitosamente`;
      // Update the Candidato
      dbOp = db.collection('candidatos')
        .updateOne({_id: this._id}, {$set: this});

    }else{
      // hash the password
      message = `Registro creado exitosamente`;
      this.password = bcrypt.hashSync(this.password, 10);
      // Insert the Candidato
      dbOp = db.collection('candidatos')
        .insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
        console.log('this._id ya en el result', this._id.toString())
        // To Do: is necessary to return the id of the candidato? maybe for the activate, but not for the update
        return {success: true, message: message, id: this._id.toString()};
      })
      .catch(err => {
        console.log('err', err)
        const message = err.code === 11000 ? 'Email duplicado' : 'Error al grabar'; 
        return {success: false, message};
      });
  }

  static fetchAll() {
    const db=getDB();
    return db.collection('candidatos')
      .find()
      .toArray()
      .then(candidatos => {
        console.log(candidatos);
        return candidatos;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    console.log('go to find:', id)
    const db=getDB();
    return db.collection('candidatos')
      .find({_id: id})
      .next()
      .then(candidato => {
        console.log('find candidato: ',candidato);
        return candidato;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }
  static findByEmail(email) {
    console.log('go to find:', email)
    const db=getDB();
    return db.collection('candidatos')
      .find({email: email})
      .next()
      .then(candidato => {
        if(candidato)
        {
          console.log('find candidato: ',candidato);
          const { password, ...candidatoNoPass } = candidato;
          return candidatoNoPass;
        }else{
          console.log('didnt find candidato');
          return candidato;
        }
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }

  static find(filter) {
    console.log('go to find:', filter)
    const db=getDB();
    return db.collection('candidatos')
      .find(filter)
      .next()
      .then(candidato => {
        console.log('find candidato: ',candidato);
        return candidato;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }

  static deleteById(id) {
    const db=getDB();
    return db.collection('candidatos')
      .deleteOne({_id: DBSYSTEM === 'COSMODB' ? id: ObjectId(id)})
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = Candidato;
