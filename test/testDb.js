const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");


let mongo = null;

const connectDB = async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(
        uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
};

const dbName = () => {
    if(mongo){
        return mongo.instanceInfo.dbName
    }
}

const dropDB = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close();
        await mongo.stop()
    }
};

const dropCollections = async () => {
    if(mongo) {
        const collectns = await mongoose.connection.db.collections();
        for (let collectn of collectns){
            await collectn.deleteMany({});
        }
    }
}

module.exports = {
    connectDB,
    dbName,
    dropDB,
    dropCollections
}