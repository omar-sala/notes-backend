const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const admin = require('../config/firebase')

/**
 * 🔐 Generate JWT Token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/**
 * 🟢 REGISTER
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = generateToken(user)

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 * 🔵 LOGIN
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      })
    }

    const token = generateToken(user)

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 * 👤 GET CURRENT USER
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')

    return res.json(user)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

/**
 *  GOOGLE AUTH (FIXED VERSION)
 */
const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body

    if (!idToken) {
      return res.status(400).json({
        message: 'No Google token provided',
      })
    }

    const decoded = await admin.auth().verifyIdToken(idToken)

    const { email, name, uid } = decoded

    // 🔥 CHECK مهم جداً (اللي انت طلبته)
    if (!email) {
      return res.status(400).json({
        message: 'Google account has no email',
      })
    }

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        name: name || 'Google User',
        email,
        password: null,
        googleId: uid, // لو ضفته في User model
      })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Google token',
    })
  }
}

module.exports = {
  register,
  login,
  getMe,
  googleAuth,
}
