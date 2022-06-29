const ObjectId = require('mongodb').ObjectId; 
const getDB = require('../util/database').getDb;

class Postulante {
  constructor(docNro, nombreCompleto, estadoCivil, sexo, fechaNacimiento, 
    nacionalidad,telefono,direccion,pais,departamento,ciudad,id) {
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
    this._id = ObjectId(id);
    
  }

  save() {
    const db=getDB();
    let dbOp;
    if(this._id){
      // Update the Postulante
      dbOp = db.collection('postulantes')
        .updateOne({_id: this._id}, {$set: this});

    }else{
      // Insert the Postulante
      dbOp = db.collection('postulantes')
        .insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log('Error en save: ',err);
      });
  }

  static fetchAll() {
    const db=getDB();
    return db.collection('postulantes')
      .find()
      .toArray()
      .then(postulantes => {
        console.log(postulantes);
        return postulantes;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db=getDB();
    return db.collection('postulantes')
      .find({_id: ObjectId(id)})
      .next()
      .then(postulante => {
        console.log(postulante);
        return postulante;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(id) {
    const db=getDB();
    return db.collection('postulantes')
      .deleteOne({_id: ObjectId(id)})
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = Postulante;
