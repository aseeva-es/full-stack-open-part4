import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getBlogsByUserName(user ? user.username : null)
      .then((userData) => {
        console.log("user data", userData);
        return userData;
      })
      .then((userData) => {
        if (userData && userData.blogs) setBlogs(userData.blogs);
        else setBlogs([]);
      });
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };
  //console.log("user: ", user, "blogs: ", blogs);

  const handleLogout = () => {
    if (setUser(null)) {
      window.localStorage.removeItem("loggedBlogappUser");
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const addBlog = (e) => {
    e.preventDefault();
    console.warn(newBlog);
    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
    });
  };
  const handleBlogChange = (e) => {
    e.preventDefault();
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:{" "}
      <input name="title" value={newBlog.title} onChange={handleBlogChange} />
      author:{" "}
      <input name="author" value={newBlog.author} onChange={handleBlogChange} />
      url: <input name="url" value={newBlog.url} onChange={handleBlogChange} />
      <button type="submit">Create</button>
    </form>
  );

  return (
    <div>
      <h1>Blog App</h1>
      <Notification text={errorMessage} />
      {!user && loginForm()}

      {user && (
        <>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <h2>Create new</h2>
          {blogForm()}
        </>
      )}
    </div>
  );
};

export default App;
