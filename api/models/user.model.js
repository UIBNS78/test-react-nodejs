var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')

var userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
})

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password,hash) {
    return bcrypt.compareSync(password,hash)
}

//Export the model
module.exports = mongoose.model('User', userSchema, 'User');