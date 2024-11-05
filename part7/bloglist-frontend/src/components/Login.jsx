import { useRef } from "react";

import loginService from "../services/login";
import blogService from "../services/blogs";

import { useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";

const Login = (props) => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();

  const { setUser } = props;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUser(user);

      blogService.setToken(user.token);
    } catch (err) {
      dispatch(createNotification("error", "Incorrect username or password", 5));
    }
  };

  return (
    <div>
      <h3>log in to application</h3>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" ref={usernameRef} data-testid="username" />
        </div>
        <div>
          password
          <input type="password" ref={passwordRef} data-testid="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
