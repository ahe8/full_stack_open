import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";

import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} >
            <div style={blogListStyle}>
              {blog.title} {blog.author}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BlogList;
