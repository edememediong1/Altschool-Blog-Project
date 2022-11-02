const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoute = require("./routes/auth")

const CONFIG = require('./config/config');
const connectToDB = require("./db/dbConfig");

connectToDB()
// require('dotenv').config()
require("./middleware/authorization")



const app = express()
app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// app.use(auth.signup);
app.use('/', authRoute)

// app.use('/blog', auth.verifyUser, blogRoute);

app.get('/', (req, res) => {
    res.send("Welcome to Eddy Blog")
});

// Error handler middleware
app.use((error, req, res, next) => {
    console.log(error)
    const errorStatus = error.status || 500
    res.status(errorStatus).send(error.message)
    next()
})

app.listen(CONFIG.PORT, () => {
    console.log(`Server is listening on port ${CONFIG.PORT}`)
});