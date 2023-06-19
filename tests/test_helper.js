const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'First blog',
      likes: 5,
      author: 'Elena',
      url: 'fix.com',
      id: 0
    },
    {
      title: 'Second blog',
      likes: 8,
      author: 'Mika',
      url: 'mimi.fi',
      id: 1
    },
  ]

  const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog=>blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

  module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
  }