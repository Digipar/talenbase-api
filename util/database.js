const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;

const mongoConnect = callback => {
  MongoClient.connect(process.env.MONGO_SERVER)
  .then(client => {
    console.log('Connected to MongoDB');
    _db = client.db();
    callback();
  
  }).catch (err => {
    console.log('Error connecting to: '+process.env.MONGO_SERVER, err)
    // throw err;
  })

}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;