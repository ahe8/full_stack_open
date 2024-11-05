import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./components/Login";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";

import NotificationMessage from "./components/NotificationMessage";

import blogService from "./services/blogs";

import { createNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUserAuthInfo, removeUserAuthInfo } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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

  const navbarStyle = {
    backgroundColor: 'LightGray',
    padding: '0.5em 0'
  }

  const padding = {
    padding: 5
  }

  return (
    <>
      {user.token === "" ? (
        <Login  />
      ) : (
        <div>
          <nav style={navbarStyle}>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <span style={padding}>{user.name} logged in</span>
            <span><button onClick={handleLogout}>logout</button></span>
          </nav>

          <NotificationMessage />

          <h2>blogs</h2>

          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="blogs/:id" element={<BlogDetails />} />
            <Route path="/" element={<BlogList user={user} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
