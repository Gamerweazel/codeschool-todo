const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
	completed: {
		type: Boolean,
		required: true,
		default: true,
	},
	title: {
		type: String,
		required: true,
	}
})

module.exports = mongoose.model('Todo', todoSchema)