import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, user, addLike, removePost }) => {
  console.log(blog)
  const [visible, setVisible] = useState(false)


  const handleClick = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    addLike(blog)
  }

  const handleRemove = () => {
    if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author)) {
      removePost(blog)
    }
  }

  return (
    <div className='flex flex-col border-solid border border-orange-400 p-4 max-w-3xl'>
      <div className='flex flex-row justify-between'>
        <div>
          {blog.title} {blog.author}
        </div>
        <Button onClick={handleClick}>{visible ? 'hide' : 'view'}</Button>
      </div>

      {visible &&
        <div className='flex flex-col gap-4'>


          <div className=''>{blog.url}</div>
          <div className='flex flex-row gap-8 align-center'>
            <div>likes {blog.likes}</div>
            <Button onClick={handleLikes}>{'Like'}</Button>
          </div>
          {user.name}

          <Button onClick={handleRemove}>{'Remove'}</Button>
        </div>}
    </div>
  )
}

export default Blog
