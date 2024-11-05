import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../../reducers/blogReducer";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const match = useMatch("/blogs/:id");

  useEffect(() => {
    const blogData = blogs.find((b) => b.id === match.params.id);
    setBlog(blogData);
  }, [match, blogs]);

  if (!blog || Object.keys(blog).length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>

      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}{" "}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <button
        style={user?.username === blog.user.username ? {} : { display: "none" }}
        onClick={() => dispatch(removeBlog(blog.id))}
      >
        remove
      </button>
    </div>
  );
};

export default BlogDetails;
