const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://vmartinetti:Y3a1HslsyZw07VQ8@cluster0.u3oly.mongodb.net/talenbase?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected to MongoDB');
    _db = client.db();
    callback();
  
  }).catch (err => {
    console.log('error', err)
    throw err;
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