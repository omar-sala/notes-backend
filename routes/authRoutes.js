const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const {
  register,
  login,
  getMe,
  googleAuth,
} = require('../controllers/authController')

// AUTH ROUTES
router.post('/register', register)
router.post('/login', login)

// protected
router.get('/me', auth, getMe)

// GOOGLE AUTH
router.post('/google', googleAuth)

module.exports = router
