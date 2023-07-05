import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getBlogsByUserName(user ? user.username : null)
    .then((userData) => {
      console.log("user data", userData);
      return userData;
    })
    .then((userData) => {
      if (userData && userData.blogs) setBlogs(userData.blogs);
      else setBlogs([]);
    });
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

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
  console.log("user: ", user, "blogs: ", blogs);

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

  return (
    <div>
      <h1>Blog App</h1>
      <Notification text={errorMessage} />
      {!user && loginForm()}

      {user && (
        <>
          <p>{user.name} logged in</p>
          <h2>blogs</h2>

          {
          blogs
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))
            }
        </>
      )}
    </div>
  );
};

export default App;
