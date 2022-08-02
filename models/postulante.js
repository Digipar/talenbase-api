const ObjectId = require('mongodb').ObjectId; 
const getDB = require('../util/database').getDb;

class Postulante {
  constructor(email, password, docNro, nombreCompleto, estadoCivil, sexo, fechaNacimiento, 
    nacionalidad,telefono,direccion,pais,departamento,ciudad, emailValidated,id) {
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
    this._id = id ? ObjectId(id) : null;
    
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
        // console.log(result);
        return {success: true, message: `Postulante ${this._id ? 'actualizado' : 'creado'} con éxito`};
      })
      .catch(err => {
        const message = err.code === 11000 ? 'El email ya existe' : 'Error al guardar el postulante'; 
        return {success: false, message};
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
    console.log('go to find:', id)
    const db=getDB();
    return db.collection('postulantes')
      .find({_id: id})
      .next()
      .then(postulante => {
        console.log('find postulante: ',postulante);
        return postulante;
      })
      .catch(err => {
        console.log(err);
        return -1
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
