import { useSelector } from "react-redux";
import { useRef } from "react";

import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} user={user} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
