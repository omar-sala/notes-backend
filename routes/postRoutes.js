const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
} = require('../controllers/postController')

// public
router.get('/my-posts', auth, getMyPosts)
router.get('/', getAllPosts)

// protected
router.post('/', auth, createPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

module.exports = router
