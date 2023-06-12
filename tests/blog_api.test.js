const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('bloges are returned as json', async ()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
}, 10000)

test('there are two blogs', async ()=> {
    const response = await api.get('/api/blogs')
    console.log('response: ',response.body)
    expect(response.body).toHaveLength(4)
})

afterAll(async () => {
    await mongoose.connection.close()
}, 100000)

