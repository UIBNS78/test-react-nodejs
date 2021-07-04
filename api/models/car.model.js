var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carSchema = new Schema({
    name: {type: String, required: true},
    autonomy: {type: Number, required: true},
    power: {type: Number, required: true},
    reload: {type: Number, required: true},
    comments: {type: Array, required: false, default: []},
    created_at: {type: Date, default: Date.now}
})

//Export the model
module.exports = mongoose.model('Car', carSchema, 'Car');