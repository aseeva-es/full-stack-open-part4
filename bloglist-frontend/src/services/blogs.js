import axios from 'axios'
const blogsUrl = '/api/blogs'
const usersUrl = '/api/users'


let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(blogsUrl, newObject, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(blogsUrl + '/' + updatedBlog.id, updatedBlog, config)
  return response.data
}

const remove = async (deletedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(blogsUrl + '/' + deletedBlog.id, config)
  return response.data
}

const getAll = async () => {
  const request = await axios.get(blogsUrl)
  return request.data
}

const getBlogsByUserName = async (username) => {
  const request = await axios.get(usersUrl + '/' + username)
  return request.data
}


export default { getAll, getBlogsByUserName, setToken, create, update, remove }
