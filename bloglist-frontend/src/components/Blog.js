import { useState } from "react";
import Button from "./Button";

const Blog = ({ blog, user }) => {
  console.log(blog)
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex flex-col border-solid border border-orange-400 p-4 max-w-3xl">
      <div className="flex flex-row justify-between">
        <div>
        {blog.title} {blog.author}
        </div>
        <Button onClick={handleClick}>{visible ? 'hide' : 'view'}</Button>
      </div>

     {visible && 
     <div className="flex  flex-col">
     
      
        <div>{blog.url}</div>
        <div>likes {blog.likes}</div>
        {user.name}
      </div>}
    </div>
  );
};

export default Blog;
