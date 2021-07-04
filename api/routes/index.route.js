const express = require('express')
const router = express.Router()
const controller = require('../controllers/index.controller')

// GET
router.get('/list-car', controller.listCar)

// POST
router.post('/add-comment', controller.addComment)
router.post('/remove-comment', controller.removeComment)

module.exports = router