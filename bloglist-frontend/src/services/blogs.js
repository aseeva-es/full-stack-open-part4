import axios from 'axios'
const blogsUrl = '/api/blogs'
const usersUrl = '/api/users'

const getAll = () => {
  const request = axios.get(blogsUrl)
  return request.then(response => response.data)
}

const getBlogsByUserName = (username) => {
  const request = axios.get(usersUrl+"/"+username)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getBlogsByUserName }