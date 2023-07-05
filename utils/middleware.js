const logger = require('./logger')
const jwt = require('jsonwebtoken')
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }
  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }
const tokenExtractor = (request, response, next) => {
   const token = getTokenFrom(request)
   request.token = token;
  next()
}

const userExtractor = (request, response, next) => {
  const user = jwt.verify(getTokenFrom(request), process.env.SECRET);
  request.user = user;
  console.log('extracted user: ', user)
  next()
}



  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(400).json({error: error.message})
    }
  
    next(error)
  }
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler, 
    tokenExtractor,
    userExtractor
  }

