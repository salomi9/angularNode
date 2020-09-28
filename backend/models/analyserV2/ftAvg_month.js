/**
 * schema of storing daily average, min and max values of all parameters
 */
const restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema;

const avgMonth = new Schema({
	nodeId: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	month: {
		type: Number,
		required: true
	},
	sensor: {
		type: String
		// required: true
	},
	values: {
		type: Object,
		required: true
	}
}, {
	collection: 'ftAvgMonth'
});

avgMonth.index({
	nodeId: 1,
	year: 1,
	month: 1
}, {
	unique: true
});

module.exports = restful.model('ftAvgMonth', avgMonth)
	.methods(['get', 'put', 'post']);