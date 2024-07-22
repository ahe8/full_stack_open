import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import NotificationMessage from './components/NotificationMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notificationType, setNotificationType] = useState()
  const [notificationMessage, setNotificationMessage] = useState()

  useEffect(() => {
    blogService.getAll()
    .then(blogs => setBlogs(blogs))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
  }

  const createNotification = (type, message) => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
        setNotificationType(null)
        setNotificationMessage(null)
    }, 5000)
  }

  return (
    <>
      {notificationMessage && <NotificationMessage type={notificationType} message={notificationMessage}/>}
      {user === null ? 
        <Login setUser={setUser} createNotification={createNotification}/> :
        <div>
          <h2>blogs</h2>
          <div>{user.name} logged in<button onClick={handleLogout}>logout</button> </div>
          <br/>
          <CreateBlogForm setBlogs={setBlogs} createNotification={createNotification} />
            
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
  )
}

export default App