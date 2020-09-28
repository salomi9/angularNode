/**
 * Schema for storing trends values for user and node
 */
const restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema;

const trends = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		require: true
	},
	node_id: {
		type: String,
		require: true
	},
	params: {
		type: Array,
		default: []
	},
	limits: {
		type: Object,
		default: {},
		required: false
	}
}, {
	collection: 'trends'
});

trends.index({
	userId: 1,
	node_id: 1
});

module.exports = restful.model('trends', trends)
	.methods(['get', 'put', 'post']);