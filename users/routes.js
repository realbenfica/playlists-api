const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('./model')

const router = new Router()

router.post('/users', (req, res, next) => {
  if (req.body.password !== req.body.password_confirmation) {
    return res.status(400).send({
      message: `Your password does not match`
    });
  }

  User.findAll({
    where: {
      email: req.body.email,
    }
  }).then(users => {
    if (users.length > 0) {
      return res.status(400).send({
        message: `Your email address already registered`
      })
    }
  });

  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    password_confirmation: ''
  };

  User.create(user)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User does not exist`
        })
      }
      return res.status(201).send(user)
    })
    .catch(error => next(error))
})

module.exports = router