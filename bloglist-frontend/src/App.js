import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";
import "./css/style.css";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    type: "green",
    message: null,
  });
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
      setNotification({ type: "warn", message: "Wrong username or password" });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const handleLogout = () => {
    if (setUser(null)) {
      window.localStorage.removeItem("loggedBlogappUser");
    }
  };

  const addBlog = (newBlog) => {
    console.warn(newBlog);
    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNotification({
        type: "green",
        message:
          "a new blog " +
          returnedBlog.title +
          " by " +
          returnedBlog.author +
          " added",
      });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
    });
  };

  return (
    <div>
      <h1>Blog App</h1>
      <Notification text={notification.message} type={notification.type} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          onSubmit={handleLogin}
          onChangeUsername={({ target }) => setUsername(target.value)}
          onChangePassword={({ target }) => setPassword(target.value)}
        ></LoginForm>
      )}

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

          {
            <Togglable buttonLabel="new blog">
              <BlogForm onSubmit={addBlog} />
            </Togglable>
          }
        </>
      )}
    </div>
  );
};

export default App;
