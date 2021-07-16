var { generateToken } = require('../config/jwt')
var User = require('../models/user.model')
var Car = require('../models/car.model')
var g = require('../global')

// CREATE
exports.signup = (request, response) => {
    const {username, email, role, password, confirm} = request.body
    User.find().sort({created_at: 'descending'}).exec((err, users) => {
        if (err) {
            return response.json({success: false, message: g.messages.errorApi})
        } else {
            if (role == "admin") {
                if (users.find(u => u.role == "admin")) {
                    return response.json({success: false, message: g.messages.adminExists})
                }
            }
            User.findOne({username}, (err, data) => {
                if (err) {
                    return response.json({success: false, message: g.messages.errorApi})
                } else {
                    if (data) {
                        return response.json({success: false, message: g.messages.usernameInUse})
                    } else {
                        if (password.length < 8) { 
                            return response.json({success: false, message: g.messages.passShort}) 
                        } else if (password !== confirm) {
                            return response.json({success: false, message: g.messages.passNotTheSame})
                        } else {
                            var newUser = new User()
                            newUser.username = username
                            newUser.email = email
                            newUser.role = role
                            newUser.password = newUser.hashPassword(password)
                            newUser.save((err, user) => {
                                if (err) {
                                    return response.json({success: false, message: g.messages.errorApi})
                                } else {
                                    return response.json({success: true, user, token: generateToken(user), message: g.messages.congrats})
                                }
                            })
                        }
                    }
                }
            })
        }
    })
}

// READ
exports.getUser = (request, response) => {
    User.find().sort({created_at: 'descending'}).exec((err, users) => {
        if (err) {
            return response.json({success: false, message: g.messages.errorApi})
        } else {
            return response.json({success: true, users})
        }
    })
}

// UPDATE
exports.updateUser = (request, response) => {
    const { _id, username, email } = request.body
    User.findOne({_id}, (err, user) => {
        if (err) {
			return response.json({success: false, message: g.messages.errorApi})
		} else {
            if (user) {
                const newUser = {
                    ...user._doc,
                    username,
                    email
                }
                User.findOneAndUpdate({_id}, {$set: newUser}, {new: true}, (err, nu) => {
                    if (err) {
                        return response.json({success: false, message: g.messages.errorApi})
                    } else {
                        if (nu) {
                            Car.find().sort({created_at: 'descending'}).exec((err, cars) => {
                                if (err) {
                                    response.json({success: false, message: g.messages.errorApi})
                                } else {
                                    let newCarData = []
                                    cars.forEach(carItem => {
                                        carItem.comments.forEach(commentItem => {
                                            if (commentItem.id_user === _id) {
                                                commentItem.username = username
                                                newCarData.push(carItem)
                                            }
                                        })
                                    })
                                    newCarData.forEach(ncard => {
                                        Car.findOneAndUpdate({_id: ncard._id}, {$set: ncard}, {new: true}, (err, nc) => {
                                            if (err) {
                                                return response.json({success: false, message: g.messages.errorApi})
                                            }
                                        })
                                    })
                                    Car.find().sort({created_at: 'descending'}).exec((err, nCarList) => {
                                        if (err) {
                                            return response.json({success: false, message: g.messages.errorApi})
                                        } else {
                                            return response.json({success: true, user: nu, cars: nCarList, token: generateToken(nu), message: g.messages.updateUserSeccessful})
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
		}
    })
}

exports.updateUserPass = (request, response) => {
    const { _id, oldPassword, newPassword, confirm } = request.body
    User.findOne({_id}, (err, user) => {
        if (err) {
			return response.json({success: false, message: g.messages.errorApi})
		} else {
            if (user) {
                if (user.comparePassword(oldPassword, user.password)) {
                    if (newPassword == confirm) {
                        const password = user.hashPassword(newPassword)
                        const newUser = {
                            ...user._doc,
                            password,
                        }
                        User.findOneAndUpdate({_id}, {$set: newUser}, {new: true}, (err, nu) => {
                            if (err) {
                                return response.json({success: false, message: g.messages.errorApi})
                            } else {
                                if (nu) {
                                    return response.json({success: true, user: nu, token: generateToken(nu), message: g.messages.updateUserSeccessful})
                                }
                            }
                        })
                    } else {
                        return response.json({success: false, message: g.messages.passNotTheSame})
                    }
                } else {
                    return response.json({success: false, message: g.messages.wrongOldPass})
                }
            }
		}
    })
}

// LOGIN
exports.login = (request, response) => {
    const { username, password } = request.body
    User.findOne({username}, (err, user) => {
        if (err) {
            return response.json({success: false, message: g.messages.errorApi})
        } else {
            if (user) {
                if (user.comparePassword(password, user.password)) {
                    return response.json({success: true, user, token: generateToken(user), message: g.messages.welcome(user.username)})
                } else {
                    return response.json({success: false, message: g.messages.passWrong})
                }
            } else {
                return response.json({success: false, message: g.messages.unknownUsername})
            }
        }

    })
}