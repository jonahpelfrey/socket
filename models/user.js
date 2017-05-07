var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({

	name: {
		type: String,
		default: ''
	},
	points: {
		type: Number,
		default: 0
	},
	completed: {
		type: Boolean,
		default: false
	},
	socket: {
		type: String,
	},
	token: {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('User', User);
