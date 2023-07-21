const ObjectId = require('mongodb').ObjectId;
const getDB = require('../util/database').getDb; 

class Curriculum {
    constructor(curriculumTexto) {
        this.curriculumTexto = curriculumTexto; 
        this.sharepointId = '';
    }

    save() {
        const db = getDB();
        let dbOp;
        let message; 
        // Insert the postulacion
        dbOp = db.collection('curriculum')
            .insertOne(this);

        return dbOp
            .then(result => {
                console.log(result);
                console.log('this._id ya en el result', this._id.toString())
                return { success: true, message: message, id: this._id.toString() };
            })
            .catch(err => {
                console.log('err', err) 
                return { success: false, message };
            });
    };
 

    static findByFilter(filter) {
        const db = getDB();
        return db.collection('curriculum')
            .find(filter)
            .toArray()
            .then(Curriculums => {
                // console.log(Curriculums);
                return Curriculums;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = Curriculum;
