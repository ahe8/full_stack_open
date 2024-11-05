import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  likeBlog,
  removeBlog,
  addCommentToBlog,
} from "../../reducers/blogReducer";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(blog, event.target.comment.value));
  };

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>

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

      <h2>comments</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="comment" />
        <button>add comment</button>
      </form>

      <ul>
        {blog?.comments.map((comment, idx) => (
          <li key={`${blog.id}comment${idx}`}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetails;
