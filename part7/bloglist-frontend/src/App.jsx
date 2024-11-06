import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import Navbar from "./components/Navbar";

import NotificationMessage from "./components/NotificationMessage";

import blogService from "./services/blogs";

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

  return (
    <>
      {user.token === "" ? (
        <Login />
      ) : (
        <div>
          <Navbar user={user} handleLogout={handleLogout} />

          <NotificationMessage />

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
