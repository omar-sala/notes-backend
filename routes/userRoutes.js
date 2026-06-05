const express = require('express')
const router = express.Router()

const admin = require('../middleware/admin')
const auth = require('../middleware/auth')

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

router.use(require('../middleware/logger'))

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, admin, deleteUser)

module.exports = router
