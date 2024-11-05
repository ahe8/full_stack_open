import { useEffect, useState } from "react";
import usersService from "../services/users";

const UserInfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((data) => setUsers(data));
  }, []);

  console.log(users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
