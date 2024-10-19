const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const userId = request.user;
  if (!userId) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id
  })

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    body,
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog);
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete) {
    response.status(204).end()
    return
  }

  const userId = request.user

  if (blogToDelete.user.toString() !== userId) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})


module.exports = blogsRouter