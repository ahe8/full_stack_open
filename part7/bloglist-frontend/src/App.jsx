import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlogForm from "./components/CreateBlogForm";
import blogService from "./services/blogs";
import NotificationMessage from "./components/NotificationMessage";
import Togglable from "./components/Togglable";

import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUserAuthInfo, removeUserAuthInfo } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());

    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON);
      dispatch(setUserAuthInfo(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeUserAuthInfo());
    window.localStorage.clear();
    blogService.setToken(null);
  };

  return (
    <>
      <NotificationMessage />

      {user.token === '' ? (
        <Login createNotification={createNotification} />
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
