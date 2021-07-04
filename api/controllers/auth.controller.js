const User = require('../models/user.model')
const g = require('./global')

exports.signup = (request, response) => {
    const {username, email, password, confirm} = request.body
    if (!username || !email || !password || !confirm) {
        response.json({success: false, message: g.messages.missingData})
    } else {
        User.findOne({username}, (err, data) => {
            if (err) {
                response.json({success: false, message: g.messages.errorApi})
            } else {
                if (data) {
                    response.json({success: false, message: g.messages.usernameInUse})
                } else {
                    if (password.length < 8) { 
                        response.json({success: false, message: g.messages.passShort}) 
                    } else if (password !== confirm) {
                        response.json({success: false, message: g.messages.passNotTheSame})
                    } else {
                        var newUser = new User()
                        newUser.username = username
                        newUser.email = email
                        newUser.password = newUser.hashPassword(password)
                        newUser.save((err, user) => {
                            if (err) {
                                response.json({success: false, message: g.messages.errorApi})
                            } else {
                                response.json({success: true, user, message: g.messages.congrats})
                            }
                        })
                    }
                }
            }

        })
    }
}

exports.login = (request, response) => {
    const { username, password } = request.body
    User.findOne({username}, (err, user) => {
        if (err) {
            response.json({success: false, message: g.messages.errorApi})
        } else {
            if (user) {
                if (user.comparePassword(password, user.password)) {
                    response.json({success: true, user, message: g.messages.welcome(user.username)})
                } else {
                    response.json({success: false, message: g.messages.passWrong})
                }
            } else {
                response.json({success: false, message: g.messages.unknownUsername})
            }
        }

    })
}