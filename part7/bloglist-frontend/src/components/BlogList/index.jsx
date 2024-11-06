import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";

import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";

import { List, ListItemButton, ListItemText } from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>

      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link
              to={`/blogs/${blog.id}`}
              key={blog.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton>
                <ListItemText
                  primary={`${blog.title} - ${blog.author}`}
                ></ListItemText>
              </ListItemButton>
            </Link>
          ))}
      </List>
    </div>
  );
};

export default BlogList;
