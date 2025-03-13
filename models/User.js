const { Schema, model } = require('mongoose')

const UserSchema = Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		enum: ['user', 'admin'],
		default: 'user'
	},
	premium: {
		type: Boolean,
		required: true,
		default: false
	},
	authorized: {
		type: Boolean,
		required: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	token: {
		type: String,
		required: true
	}
})

module.exports = model('User', UserSchema)
