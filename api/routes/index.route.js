var express = require('express')
var router = express.Router()
var controller = require('../controllers/index.controller')
var { isLoggedIn } = require('../config/jwt')

// GET
router.get('/list-car', controller.listCar)
router.get('/remove-car/:id', isLoggedIn, controller.removeCar)

// POST
router.post('/add-car', isLoggedIn, controller.addCar)
router.post('/add-comment', isLoggedIn, controller.addComment)
router.post('/remove-comment', isLoggedIn, controller.removeComment)

module.exports = router