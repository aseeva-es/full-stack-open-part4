import axios from "axios";
const blogsUrl = "/api/blogs";
const usersUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(blogsUrl, newObject, config);
  return response.data;
};

const getAll = async () => {
  const request = await axios.get(blogsUrl);
  return request.data;
};

const getBlogsByUserName = async (username) => {
  const request = await axios.get(usersUrl + "/" + username);
  return request.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getBlogsByUserName, setToken, create };
