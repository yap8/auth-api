const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token)
      return res.json({ message: 'Invalid credentials' })

    const decoded = jwt.verify(token, JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    next()
  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports = { protect }
