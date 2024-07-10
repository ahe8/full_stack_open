const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

describe('where there is initially some blogs saved', () => {
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

    describe('addition of a new blog', () => {
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

            assert(response.body.length === helper.initialBlogs.length)
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

            assert(response.body.length === helper.initialBlogs.length)
        })
    })


    describe('updating a blog', () => {
        test('updating likes of a blog', async () => {
            const updatedBlog = {
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 10
            }

            const blogToBeUpdated = await Blog.find({ title: updatedBlog.title });
            const previousLikes = blogToBeUpdated[0].likes;

            const response = await api
                .put(`/api/blogs/${blogToBeUpdated[0].id}`)
                .send(updatedBlog)
                .expect(200)

            assert(previousLikes !== response.body.likes)
            assert(response.body.likes === updatedBlog.likes)
        })

        test('updating title and url of blog', async () => {
            const updatedBlog = {
                title: "Clean Code",
                author: "Robert C. Martin",
                url: "http://cleancoder.com/",
                likes: 0
            }

            const blogTitleToUpdate = 'TDD harms architecture'

            const blogToBeUpdated = await Blog.find({ title: blogTitleToUpdate });

            const idToBeUpdated = blogToBeUpdated[0].id;

            await api
                .put(`/api/blogs/${idToBeUpdated}`)
                .send(updatedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            const response = await Blog.findById(idToBeUpdated)
            assert(response.title === updatedBlog.title)
            assert(response.url === updatedBlog.url)
        })
    })

    describe('deleting a blog', () => {
        test('deleting a blog with an id that exists', async () => {
            const blogToDelete = await Blog.findOne();

            const idToDelete = blogToDelete.id;

            await api
            .delete(`/api/blogs/${idToDelete}`)
            .expect(204)

            const blogsInDb = await helper.blogsInDb();
            const response = await Blog.findById(idToDelete);

            assert(helper.initialBlogs.length, blogsInDb.length - 1)
            assert(!response);
        })

        test('deleting a blog with an id that does not exist', async () => {
            const idOfBlogToDelete = await helper.nonExistingId();

            await api
            .delete(`/api/blogs/${idOfBlogToDelete}`)
            .expect(204)

            const blogsInDb = await helper.blogsInDb();

            assert(helper.initialBlogs.length, blogsInDb.length)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})