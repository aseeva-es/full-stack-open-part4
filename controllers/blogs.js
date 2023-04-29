const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    blogs.forEach(blog => {
      console.log(blog)
    })
    response.json(blogs);
      
    })
    .catch((error) => {
        console.log('error', error)
      })
  })

  
  blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })

  module.exports = blogsRouter