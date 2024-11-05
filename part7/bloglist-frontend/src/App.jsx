import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import UserInfo from "./components/UserInfo";

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

  return (
    <>
      <NotificationMessage />

      {user.token === "" ? (
        <Login createNotification={createNotification} />
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in<button onClick={handleLogout}>logout</button>{" "}
          </div>
          <br />

          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserInfo />} />
            <Route path="/" element={<BlogList user={user} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
