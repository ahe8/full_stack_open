import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('create new blog' , async() => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('input[name="title"]')
  const authorInput = container.querySelector('input[name="author"]')
  const urlInput = container.querySelector('input[name="url"]')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'www.testurl.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testurl.com')
})