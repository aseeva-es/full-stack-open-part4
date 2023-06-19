const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (requist, response) => {
  const { username, name, password } = requist.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
if(!username || !passwordHash) {
  response.status(400).send('User info is not fulfilled')
}

  const user = new User( {
    username,
    name,
    passwordHash
  })


const savedUser = await user.save()

response.status(201).json(savedUser)

})

usersRouter.get('/', async (requist, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1});
  response.json(users);
  })


module.exports = usersRouter;