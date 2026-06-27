const cors = require('cors')
require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

// CORS FIRST
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// JSON parser
app.use(express.json())

// Logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

// Routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

// Health check
app.get('/ping', (req, res) => {
  res.send('PONG')
})

// Home
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    status: 'OK',
  })
})

// Error handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
