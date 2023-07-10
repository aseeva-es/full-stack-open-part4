import { useState } from "react";

const BlogForm = (props) => {
    const [newBlog, setNewBlog] = useState({
        title: "",
        author: "",
        url: "",
      });

    const handleBlogChange = (e) => {
        e.preventDefault();
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
      };

    return(


    <form onSubmit={(e)=>{
        e.preventDefault();
        props.onSubmit(newBlog);
        setNewBlog({
            title: "",
            author: "",
            url: "",
          });
        }}>
      <div>
        title:{" "}
        <input name="title" value={newBlog.title} onChange={handleBlogChange} />
      </div>
      <div>
        author:{" "}
        <input
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url:{" "}
        <input name="url" value={newBlog.url} onChange={handleBlogChange} />
      </div>
      <button type="submit">Create</button>
    </form>
  )};

  export default BlogForm;