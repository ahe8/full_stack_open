const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    body, 
    { new:true , runValidators: true, context: 'query' }
  )

  response.json(updatedBlog);
})


blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})


module.exports = blogsRouter