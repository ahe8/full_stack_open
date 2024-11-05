import { useState } from "react";

import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} className="blog">
      <span>{blog.title} </span>
      <span>{blog.author}</span>
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      <div style={showWhenVisible} className="blogDetails">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => dispatch(likeBlog(blog))}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button
          style={
            user.username === blog.user.username ? {} : { display: "none" }
          }
          onClick={() => dispatch(removeBlog(blog.id))}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
