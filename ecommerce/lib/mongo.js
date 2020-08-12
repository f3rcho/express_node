const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:mongo')
const { config } = require('../config/config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect( err => {
                    if (err) {
                        reject(err, err.message);
                    }
                    debug('Connected successfully to Mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }
        return MongoLib.connection;
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        });
    };

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id)})
        });
    };

    create(collection, datos) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(datos);
        }).then(result => result.insertedId)
    };

    update(collection, data, id) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id)}, { $set: data }, { upsert: true })
        }).then(result => result.upsertedId || id);
    };

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id)});
        }).then(() => id);
    };

};

module.exports = MongoLib;