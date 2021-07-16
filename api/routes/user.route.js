const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
var { isLoggedIn } = require('../config/jwt')

// GET
router.get('/get-user', isLoggedIn, controller.getUser)

// POST
router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/update-user', isLoggedIn, controller.updateUser)
router.post('/update-user-pass', isLoggedIn, controller.updateUserPass)
// router.post('/update-user', controller.updateUser)
// router.post('/update-user-pass', controller.updateUserPass)

module.exports = router