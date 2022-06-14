// Data Access Layer

const MongoClient = require('mongodb').MongoClient;
// When running in docker the hostname is going to be set to the name of the service in the docker-compose file (db)
const url         = process.env[ 'MONGODB_URI' ] || `mongodb://${ process.env[ 'NODE_ENV' ] === 'production' ? 'db' : '0.0.0.0' }:27017`;
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    if ( err ) throw err;
    console.log('Connected successfully to db server');

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        // eslint-disable-next-line no-unused-vars
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        // eslint-disable-next-line no-unused-vars
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        // eslint-disable-next-line no-unused-vars
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    });
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnDocument: 'after' },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        // eslint-disable-next-line no-unused-vars
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}


module.exports = {create, findOne, find, update, all};