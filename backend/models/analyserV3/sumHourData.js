const restful = require('node-restful'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

const sumHour = new Schema({
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
        },
        hour: {
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
	collection: 'sumHourData'
})

sumHour.index({
	"_id.nodeId": 1,
	"value.timestamp" : 1,
}, {
	unique: true
});

module.exports = restful.model('sumHourData', sumHour)
	.methods(['get', 'put', 'post']);