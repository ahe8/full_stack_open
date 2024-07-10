const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({});

    await Blog.insertMany(helper.initialBlogs);
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

test('blogs have a unique identifier named id', async () => {
    const response = await api.get('/api/blogs');

    const blogs = response.body;

    assert(blogs.every(blog => blog.hasOwnProperty('id')));
})

test('adding a new blog to the database', async () => {
    const newBlog = {
        title: "Code Complete",
        author: "Steve McConnell",
        url: "https://people.engr.tamu.edu/slupoli/notes/ProgrammingStudio/supplements/Code%20Complete%202nd.pdf",
        likes: 18
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    assert(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('Code Complete'))
})

test('adding a new blog without likes should assign default value of 0', async () => {
    const newBlogWithoutLikeProperty = {
        title: "The Pragmatic Programmer",
        author: "Dave Thomas and Andrew Hunt",
        url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/"
    }

    await api
        .post('/api/blogs')
        .send(newBlogWithoutLikeProperty)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs');

    const results = response.body.filter(blog => blog.title === 'The Pragmatic Programmer');

    const addedBlog = results[0];

    assert(addedBlog.hasOwnProperty('likes'));
    assert(addedBlog.likes === 0);
    assert(results.length === 1);
})

test('adding a new blog without title should fail', async () => {
    const newBlogWithoutTitle = {
        author: "George Washington",
        url: "www.google.com"
    }

    await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert(response.body.length, helper.initialBlogs.length)
})

test('adding a new blog without url should fail', async () => {
    const newBlogWithoutUrl = {
        title: "Bill of Rights",
        author: "James Madison"
    }

    await api
        .post('/api/blogs')
        .send(newBlogWithoutUrl)
        .expect(400)

    const response = await api.get('/api/blogs');

    assert(response.body.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})