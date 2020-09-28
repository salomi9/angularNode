/**
 * Schema for storing node group details for company
 */
const restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema;

const nodeGroupsSchema = new Schema({
	companyId: {
		type: Schema.Types.ObjectId,
		ref: 'company',
		unique: true,
		required: true
	},
	zones: {
		type: Array,
		default: []
	},
	applications: {
		type: Array,
		default: []
	}
}, {
	collection: 'nodeGroups'
});

const nodeGroups = restful.model('nodeGroups', nodeGroupsSchema)
	.methods(['get', 'put', 'post']);

module.exports = nodeGroups;