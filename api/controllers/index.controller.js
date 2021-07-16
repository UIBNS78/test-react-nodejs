const Car = require('../models/car.model')
const g = require('../global')

exports.addCar = (request, response) => {
    const { name, autonomy, power, reload } = request.body
    const newCar = new Car({ name, autonomy, power, reload })
    newCar.save((err, car) => {
        if (err) {
            return response.json({success: false, message: 'Une erreur s\'est produit, veuillez réessayer plus tard.'})
        } else {
            this.listCar(request, response)
        }
    })
}

exports.listCar = (request, response) => {
    Car.find().sort({created_at: 'descending'}).exec((err, cars) => {
        if (err) {
            return response.json({success: false, message: g.messages.errorApi})
        } else {
            return response.json({success: true, cars})
        }
    })
}

exports.removeCar = (request, response) => {
    const { id } = request.params
    Car.findByIdAndRemove({_id: id}, (err, res) => {
        if (err) {
            return response.json({success: false, message: g.messages.errorApi})
        } else {
            // GET ALL CARS
            Car.find().sort({created_at: 'descending'}).exec((err, cars) => {
                if (err) {
                    return response.json({success: false, message: g.messages.errorApi})
                } else {
                    return response.json({success: true, cars})
                }
            })
        }
    })
}

exports.removeComment = (request, response) => {
    const { id_car, id_comment } = request.body
    Car.findOne({_id: id_car}, (err, car) => {
        if (err) {
            return response.json({success: false, message: g.messages.errorApi})
        } else {
            if (car) {
                // REMOVE COMMENT
                const comments = car.comments.filter(cm => cm.id_comment !== id_comment)
                // UPDATE DATA
                car.comments = comments
                Car.findOneAndUpdate({_id: car._id}, {$set: car}, {new: true}, (err, car) => {
                    if (err) {
                        return response.json({success: false, message: g.messages.errorApi})
                    } else {
                        // GET ALL CARS
                        Car.find().sort({created_at: 'descending'}).exec((err, cars) => {
                            if (err) {
                                return response.json({success: false, message: g.messages.errorApi})
                            } else {
                                return response.json({success: true, cars})
                            }
                        })
                    }
                })
            }
        }
    })
}

exports.addComment = (request, response) => {
    const { id_car, id_user, username, comment } = request.body
    Car.findOne({_id: id_car}, (err, car) => {
        if (err) {
            return response.json({success: false, message: g.messages.errorApi})
        } else {
            if (car) {
                const id_comment = Math.random() * 1000
                const commented_at = new Date()
                const created_at = new Date()
                // ADD COMMENT
                car.comments.push({id_car, id_user, id_comment, username, comment, commented_at, created_at})
                // UPDATE DATA
                Car.findOneAndUpdate({_id: car._id}, {$set: car}, {new: true}, (err, car) => {
                    if (err) {
                        return response.json({success: false, message: g.messages.errorApi})
                    } else {
                        // GET ALL CARS
                        Car.find().sort({created_at: 'descending'}).exec((err, cars) => {
                            if (err) {
                                return response.json({success: false, message: g.messages.errorApi})
                            } else {
                                return response.json({success: true, cars})
                            }
                        })
                    }
                })
            }
        }
    })
}