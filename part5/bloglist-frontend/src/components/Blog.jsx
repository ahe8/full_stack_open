import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className='blogDetails'>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        <button style={user.id === blog.user.id ? { display: 'none' } : {}} onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  )
}


export default Blog