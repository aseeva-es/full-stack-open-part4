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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Elena',
    likes: 5,
    id: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})
afterAll(async () => {
    await mongoose.connection.close()
}, 100000)

