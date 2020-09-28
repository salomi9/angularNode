/**
 * schema of storing Alert Notification
 */
const restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema;

const alertNotificationSchema = new Schema({
	companyId: {
		type: Schema.Types.ObjectId,
		ref: 'company',
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	read: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: Date,
		default: new Date(new Date().getTime() + 19800000)
	},
	message: {
		type: String,
		required: true
	},
	pfcToken: {
		used: {
			type: Boolean
		},
		token: {
			type: String
		}
	},
	nodeId: {
		type: String,
		required: false
	},
	param: {
		type: String,
		required: false
	}
}, {
	collection: 'alertNotification'
});

const alertNotification = restful.model('alertNotification', alertNotificationSchema)
	.methods(['get', 'put', 'post']);

module.exports = alertNotification;