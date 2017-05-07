var mongoose = require('mongoose');
var User = require('./user.js');
var Schema = mongoose.Schema;

var Game = new Schema({

	users: {
		type: Number,
		default: 0
	},
	token: {
		type: String,
		default: ''
	},
	completed: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Game', Game);
