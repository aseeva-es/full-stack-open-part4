const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('express')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
mongoose.connect(config.url)
.then(()=>{
    logger.info('connected to MongoDB')
})
.catch((error)=>{
    logger.error('error connecting to MongoDb', error.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app