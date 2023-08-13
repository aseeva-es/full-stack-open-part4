import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import './css/style.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    type: 'green',
    message: null,
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getBlogsByUserName(user ? user.username : null)
      .then((userData) => {
        console.log('user data', userData)
        return userData
      })
      .then((userData) => {
        if (userData && userData.blogs) setBlogs(userData.blogs)
        else setBlogs([])
      })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ type: 'warn', message: 'Wrong username or password' })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    if (setUser(null)) {
      window.localStorage.removeItem('loggedBlogappUser')
    }
  }

  const addBlog = (newBlog) => {
    console.warn(newBlog)
    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification({
        type: 'green',
        message:
          'a new blog ' +
          returnedBlog.title +
          ' by ' +
          returnedBlog.author +
          ' added',
      })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    })
  }

  const addLike = (blog) => {
    let newLikes = 1
    if (!blog) return
    if (typeof blog.likes === 'number') { newLikes = blog.likes + 1 }
    const newBlog = { ...blog, likes: newLikes }
    blogService.update(newBlog)
      .then((updatedBlog) => {

        // const newBlogs = blogs.filter((blog)=>blog.id !== updatedBlog.id).concat(updatedBlog)
        const index = blogs.findIndex((item) => item.id === updatedBlog.id)
        const newBlogs = [...blogs]
        newBlogs.splice(index, 1, updatedBlog)
        setBlogs(newBlogs)

        setNotification({
          type: 'green',
          message:
            'blog updated'
        })
        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
      })
  }

  const removePost = (post) => {
    blogService.remove(post)
      .then(() => {
        const newBlogs = blogs.filter((blog) => blog.id !== post.id)
        setBlogs(newBlogs)

        setNotification({
          type: 'green',
          message: 'post deleted'
        })

        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
      })


  }

  return (
    <div className='container flex flex-col p-6 gap-2 h-screen '>
      <p className='text-4xl mb-2'>Blog App</p>
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
          <p className='text-sm'>{user.name} logged in</p>
          <button type='submit' onClick={handleLogout} className='border-solid border border-orange-400 w-24 text-sm py-1 rounded mb-2'>
            logout
          </button>
          <h2 className='text-xl'>Blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removePost={removePost}></Blog>
            ))}
          <h2 className='text-xl mt-2'>Create new</h2>

          {
            <Togglable buttonLabel='new blog' >
              <BlogForm onSubmit={addBlog} />
            </Togglable>
          }
        </>
      )}
    </div>
  )
}

export default App
