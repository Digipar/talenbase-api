const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;
const connectTo = process.env.MONGO_SERVER_PART1 + process.env.DB + process.env.MONGO_SERVER_PART2

const mongoConnect = callback => {
  MongoClient.connect(connectTo)
    .then(client => {
      console.log('Connected to MongoDB');
      _db = client.db();
      callback();

    }).catch(err => {
      console.log('Error connecting to: ' + connectTo, err)
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