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
            type: Number,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        },
        sensor: {
            type: String,
            required: true
        }
    }
},{
	collection: 'sumYearData4to20mA'
})

sumYear.index({
	"_id.nodeId": 1,
	"value.timestamp" : 1,
}, {
	unique: true
});

module.exports = restful.model('sumYearData4to20mA', sumYear)
	.methods(['get', 'put', 'post']);