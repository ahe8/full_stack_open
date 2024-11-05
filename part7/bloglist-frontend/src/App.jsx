import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlogForm from "./components/CreateBlogForm";
import blogService from "./services/blogs";
import NotificationMessage from "./components/NotificationMessage";
import Togglable from "./components/Togglable";

import { useDispatch } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.clear();
    blogService.setToken(null);
  };

  const createBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs((blogs) => [...blogs, savedBlog]);
      blogFormRef.current.toggleVisibility();

      dispatch(
        createNotification(
          "success",
          `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
          5
        )
      );
    } catch (err) {
      console.log(err);
      dispatch(createNotification("error", err.response.data.error, 5));
    }
  };

  const likeBlog = async (likedBlog) => {
    try {
      const blogObject = {
        title: likedBlog.title,
        author: likedBlog.author,
        url: likedBlog.url,
        likes: likedBlog.likes + 1,
      };
      const updatedBlog = await blogService.update(likedBlog.id, blogObject);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === likedBlog.id ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
    } catch (e) {
      console.log(e);
    }
  };

  const removeBlog = async (blogToRemove) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
        )
      ) {
        blogService.remove(blogToRemove.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
        dispatch(
          createNotification(
            "success",
            `${blogToRemove.title} by ${blogToRemove.author} removed`,
            5
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NotificationMessage />

      {user === null ? (
        <Login setUser={setUser} createNotification={createNotification} />
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in<button onClick={handleLogout}>logout</button>{" "}
          </div>
          <br />

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm createBlog={createBlog} />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default App;
