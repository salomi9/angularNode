/**
 * Storing details of meter details
 */
const restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema;


const meterSchema = new Schema({
	name: {
		type: String,
		required: false,
		unique: true
	},
	specification: {
		type: Array,
		default: []
	},
	update_date: {
		type: Date,
		default: new Date(new Date().getTime() + 19800000)
	},
	create_date: {
		type: Date,
		default: new Date(new Date().getTime() + 19800000)
	}
}, {
	collection: 'meters'
});

//DB Middlewares
meterSchema.pre('save', function (next) {
	this.update_date = Date();
	next();
});

const Meter = restful.model('meter', meterSchema)
	.methods(['get', 'post', 'put', 'delete']);


module.exports = Meter;