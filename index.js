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

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

// Routes (clean structure)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

// Health check
app.get('/ping', (req, res) => {
  res.send('PONG')
})

// Home Route
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    status: 'OK',
  })
})

// Error handling (last middleware)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
