import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlogForm from "./components/CreateBlogForm";
import blogService from "./services/blogs";
import NotificationMessage from "./components/NotificationMessage";
import Togglable from "./components/Togglable";

import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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

  // const createBlog = async (newBlog) => {
  //   try {
  //     const savedBlog = await blogService.create(newBlog);
  //     setBlogs((blogs) => [...blogs, savedBlog]);
  //     blogFormRef.current.toggleVisibility();

  //     dispatch(
  //       createNotification(
  //         "success",
  //         `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
  //         5
  //       )
  //     );
  //   } catch (err) {
  //     console.log(err);
  //     dispatch(createNotification("error", err.response.data.error, 5));
  //   }
  // };

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
            <CreateBlogForm />
          </Togglable>

          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} user={user} blog={blog} />
            ))}
        </div>
      )}
    </>
  );
};

export default App;
