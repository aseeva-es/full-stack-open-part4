import { useState } from 'react'
import PropTypes from 'prop-types'
import React from 'react'

const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogChange = (e) => {
    e.preventDefault()
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  return (


    <form onSubmit={(e) => {
      e.preventDefault()
      props.onSubmit(newBlog)
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    }}>
      <div>
        title{' '}
        <input
          name='title' value={newBlog.title}
          onChange={handleBlogChange}
          id='title'
          className='mt-1 px-4 py-3  border border-orange-400 block w-1/2 rounded sm:text-sm'
        />
      </div>
      <div>
        author{' '}
        <input
          name='author'
          value={newBlog.author}
          onChange={handleBlogChange}
          id='author'
          className='mt-1 px-4 py-3  border border-orange-400 block w-1/2 rounded sm:text-sm'

        />
      </div>
      <div>
        url{' '}
        <input
          name='url'
          value={newBlog.url}
          id='url'
          onChange={handleBlogChange}
          className='mt-1 px-4 py-3  border border-orange-400 block w-1/2 rounded sm:text-sm mb-2'
        />
      </div>
      <button type='submit' className='create-btn border-solid border border-orange-400 w-24 text-sm p-2 rounded mb-2'>
        Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleBlogChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
}

export default BlogForm