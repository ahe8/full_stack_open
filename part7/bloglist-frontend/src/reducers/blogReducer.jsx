import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const { id, updatedBlog } = action.payload;
      return state.map((blog) => (blog.id === id ? updatedBlog : blog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const { id } = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { updateBlog, appendBlog, setBlogs, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogObj = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogsService.update(blog.id, blogObj);
    dispatch(updateBlog({ id: blog.id, updatedBlog }));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    blogsService.remove(id).then(() => dispatch(deleteBlog({ id })));
  };
};

export const addCommentToBlog = (blog, comment) => {
  return async (dispatch) => {
    const blogObj = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      comments: [...(blog?.comments || []), comment]
    };
    const updatedBlog = await blogsService.update(blog.id, blogObj);
    dispatch(updateBlog({ id: blog.id, updatedBlog }));
  };
}

export default blogSlice.reducer;
