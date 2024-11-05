import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/blogReducer";
import { createNotification } from "../../reducers/notificationReducer";

const CreateBlogForm = () => {
  const titleRef = useRef("");
  const authorRef = useRef("");
  const urlRef = useRef("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      url: urlRef.current.value,
    };

    const res = dispatch(createBlog(newBlog));

    if (res) {
      dispatch(
        createNotification(
          "success",
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      );
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input type="text" ref={titleRef} name="title" data-testid="title" />
        </div>
        <div>
          author:
          <input
            type="text"
            ref={authorRef}
            name="author"
            data-testid="author"
          />
        </div>
        <div>
          url:
          <input type="text" ref={urlRef} name="url" data-testid="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
