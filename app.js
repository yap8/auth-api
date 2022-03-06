require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/auth-api'

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api', require('./routes/index'))

// start
const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    mongoose.connect(DB_URI, () => console.log(`DB connected`))
  } catch (err) {
    console.log(err)
  }
}

start()
