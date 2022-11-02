const mongoose = require('mongoose');
const CONFIG = require('../config/config');


function connectToDataBase() {
    mongoose.connect(CONFIG.MONGODB_URL)

    mongoose.connection.on("connected", () => {
        console.log('Database connected successfully')
    })

    mongoose.connection.on("error", (err) => {
        console.log('An error occurred while trying to connect to database', err)
    })
};


module.exports = connectToDataBase