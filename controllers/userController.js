const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const userController = {
  // @desc Register a new user
  // @route POST /api/users/register
  // @access Public
  async register(req, res) {
    try {
      const { name, email, password } = req.body

      const userExists = await User.findOne({ email })

      if (userExists)
        return res.json({ message: 'User exists' })

      const hash = await bcrypt.hash(password, 12)

      const newUser = new User({
        name,
        email,
        password: hash
      })

      await newUser.save()

      res.json({ message: 'Registration successful' })
    } catch (error) {
      res.json({ message: error.message })
    }
  },
  // @desc Authenticate a user
  // @route POST /api/users/login
  // @access Public
  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user)
        return res.json({ message: 'No user with such email'})

      if (!await bcrypt.compare(password, user.password))
        return res.json({ message: 'Invalid credentials'})

      res.json({
        token: generateToken({ id: user._id })
      })
    } catch (error) {
      res.json({ message: error.message })
    }
  },
  // @desc Get user data
  // @route GET /api/users/me
  // @access Private
  async getUserData(req, res) {
    try {
      res.json(req.user)
    } catch (error) {
      res.json({ message: error.message })
    }
  }
}

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = userController
