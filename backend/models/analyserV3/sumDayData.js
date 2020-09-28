const restful = require('node-restful'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

const sumDay = new Schema({
    _id: {
        nodeId: {
            type: String,
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
        date: {
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
	collection: 'sumDayData'
})

sumDay.index({
	"_id.nodeId": 1,
	"value.timestamp" : 1,
}, {
	unique: true
});

module.exports = restful.model('sumDayData', sumDay)
	.methods(['get', 'put', 'post']);