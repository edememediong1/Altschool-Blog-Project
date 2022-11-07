const server = require('./app')
const {PORT} = require('./config/config')

require('./db/dbConfig').connectToDataBase()


server.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
})