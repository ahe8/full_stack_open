import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


const blog = {
  id: '1',
  title: 'Better Call Saul',
  author: 'James McGill',
  likes: '20',
  url: 'www.bettercallsaul.com',
  user: {
    name: 'test'
  }
}

const mockUser = {
  id:'1'
}

test('renders content', async () => {
  render(<Blog blog={blog} user={mockUser}/>)

  const blogTitle = screen.getByText('Better Call Saul James McGill')
  expect(blogTitle).toBeDefined()
})

test('renders details when button is clicked', async () => {
  let { container } = render(<Blog blog={blog} user={mockUser}/>)

  const div = container.querySelector('.blogDetails')

  expect(div).toHaveStyle('display: none')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(div).toHaveStyle('display: block')

  const blogUrl = screen.getByText('www.bettercallsaul.com')
  const blogLikes = screen.getByText('likes 20')

  expect(blogUrl).toBeDefined()
  expect(blogLikes).toBeDefined()
})

test('click like button twice', async () => {
  const mockLikeBlogHandler = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} user={mockUser} likeBlog={mockLikeBlogHandler}/>)

  const viewBlogDetailButton = screen.getByText('view')
  await user.click(viewBlogDetailButton)

  const likeBlogButton = screen.getByText('like')
  await user.click(likeBlogButton)
  await user.click(likeBlogButton)

  expect(mockLikeBlogHandler.mock.calls).toHaveLength(2)
})