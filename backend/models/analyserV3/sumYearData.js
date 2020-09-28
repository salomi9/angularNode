const restful = require('node-restful'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

const sumYear = new Schema({
    _id: {
        nodeId: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    value: {
        data: {
            type: Object,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    }
},{
	collection: 'sumYearData'
})

sumYear.index({
	"_id.nodeId": 1,
	"value.timestamp" : 1,
}, {
	unique: true
});

module.exports = restful.model('sumYearData', sumYear)
	.methods(['get', 'put', 'post']);