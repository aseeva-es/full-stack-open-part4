const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog =require('../models/blog')

const api = supertest(app);

const initialBlogs = [
    {
      content: 'First blog',
      likes: 5,
      id: 0
    },
    {
      content: 'Second blog',
      likes: 8,
      id: 1
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
  })

test('blogs are returned as json', async ()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
}, 10000)

test('all blogs are returned', async () =>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () =>{
    const response = await api.get('/api/blogs')
    console.log(response.body)
    response.body.forEach((i)=>expect(i.id).toBeDefined())
})

afterAll(async () => {
    await mongoose.connection.close()
}, 100000)

