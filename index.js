const mongoose = require('mongoose')
const express = require('express')
const cors = require('express')
const app = express()
require('dotenv').config()

const url = process.env.MONGODB_URI
mongoose.connect(url)
mongoose.set('strictQuery',false)

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)


  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    // mongoose.connection.close()
  })
  

  
//   const mongoUrl = 'mongodb://localhost/bloglist'
//   mongoose.connect(mongoUrl)
  
  app.use(cors())
  app.use(express.json())
  
  app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

 PORT = process.env.PORT || 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })