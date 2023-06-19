const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog =require('../models/blog');
const helper = require('./test_helper');


const api = supertest(app);

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
    .map((blog)=> new Blog(blog));
    const promiseArr = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArr);  
   
  })
describe('when there is initially blogs saved', ()=>{
  test('blogs are returned as json', async ()=>{
      await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
  }, 10000)

  test('all blogs are returned', async () =>{
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('bloge with validated properties', ()=>{
  test('unique identifier property of the blog posts is named id', async () =>{
      const response = await api.get('/api/blogs')
      response.body.forEach((i)=>expect(i.id).toBeDefined())
  })
  test('verify property like exists and equil zero', async()=>{
    const newBlog = {
      title: 'async/await simplifies making async calls',
      url:'fix.com',
      author: 'Elena',
      id: 5,
      userId: "648f5f31d08f587add436fa0"
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(r =>r.title === 'async/await simplifies making async calls')
    expect(blog.likes).toBe(0)
  })

})

describe('blog addition', ()=>{
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'fix.com',
      author: 'Elena',
      likes: 5,
      id: 1,
      userId: "648f5f31d08f587add436fa0"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })
})

describe('deletaion blog', ()=>{
  test('a blog should be deleted', async ()=>{
  
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api 
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const contents = blogsAtEnd.map(r=>r.title)
    expect(contents).not.toContain(blogToDelete.title)
  
  })
})

describe('blog updating', ()=>{
  test('property likes should be updated', async () =>{
    const blogsAtEnd = await helper.blogsInDb()
    const blogToUpdate = blogsAtEnd[0]
  
    await api
      .put(`/api/blogs/${blogToUpdate.id.likes}`)
      .expect('Content-Type', /application\/json/)
  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      const contents = blogsAtEnd.map(r=>r.likes)
      expect(contents).toContain(blogToUpdate.likes)
  
  })

})

describe('unvalidated blog is not added', ()=>{
  test('blog without title or url is not added', async ()=>{
    const newBlog = {
      author: 'Elena',
      likes: 7,
  
    }
    await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


afterAll(async () => {
    await mongoose.connection.close()
}, 100000)

