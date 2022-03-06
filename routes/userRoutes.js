const router = require('express').Router()
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/me', protect, userController.getUserData)

module.exports = router
