/**
 * To store Firebase ids
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceIds = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'company',
		required: true
	},
	appId: {
		type: String
	},
	webId: {
		type: String
	}
}, {
	collection: 'deviceIds'
})

module.exports = mongoose.model('deviceIds', deviceIds)