/**
 * schema of storing daily average, min and max values of all parameters
 */
const restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema;

const avgHour = new Schema({
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
	day: {
		type: Number,
		required: true
	},
	hour: {
		type: Number,
		required: true
	},
	values: {
		type: Object,
		required: true
	}

}, {
	collection: 'avgHour'
});

avgHour.index({
	nodeId: 1,
	timestamp : 1,
}, {
	unique: true
});

module.exports = restful.model('avgHour', avgHour)
	.methods(['get', 'put', 'post']);