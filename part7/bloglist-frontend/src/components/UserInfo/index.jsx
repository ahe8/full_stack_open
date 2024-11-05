import { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import usersService from "../../services/users";

const UserInfo = () => {
  const [user, setUser] = useState({});
  const match = useMatch("/users/:id");

  useEffect(() => {
    usersService.getUser(match.params.id).then((data) => {
      setUser(data);
    });
  }, [match]);

  if (Object.keys(user).length === 0) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.title}>{blog.title}</li>
        })}
      </ul>
    </div>
  );
};

export default UserInfo;
