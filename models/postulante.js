const ObjectId = require('mongodb').ObjectId; 
const getDB = require('../util/database').getDb;
const bcrypt = require('bcryptjs');

class Postulante {
  constructor(email, password, docNro, nombreCompleto, estadoCivil, sexo, fechaNacimiento, 
    nacionalidad,telefono,direccion,pais,departamento,ciudad, emailValidated,sharepointId,id) {
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
    this._id = id ? ObjectId(id) : null;
    
  }

  save() {
    const db=getDB();
    let dbOp;
    let message;
    console.log('this._id antes de entrar', this._id)
    if(this._id){
      message = `TALENT_UPDATED_SUCCESSFULLY`;
      // Update the Postulante
      dbOp = db.collection('postulantes')
        .updateOne({_id: this._id}, {$set: this});

    }else{
      // hash the password
      message = `TALENT_CREATED_SUCCESSFULLY`;
      this.password = bcrypt.hashSync(this.password, 10);
      // Insert the Postulante
      dbOp = db.collection('postulantes')
        .insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
        console.log('this._id ya en el result', this._id.toString())
        // To Do: is necessary to return the id of the postulante? maybe for the activate, but not for the update
        return {success: true, message: message, id: this._id.toString()};
      })
      .catch(err => {
        console.log('err', err)
        const message = err.code === 11000 ? 'EMAIL_DUPLICATED' : 'UNKNOW_ERROR_SAVING_TALENT'; 
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
  static findByEmail(email) {
    console.log('go to find:', email)
    const db=getDB();
    return db.collection('postulantes')
      .find({email: email})
      .next()
      .then(postulante => {
        console.log('find postulante: ',postulante);
        const { password, ...postulanteNoPass } = postulante;
        return postulanteNoPass;
      })
      .catch(err => {
        console.log(err);
        return -1
      });
  }

  static find(filter) {
    console.log('go to find:', filter)
    const db=getDB();
    return db.collection('postulantes')
      .find(filter)
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
