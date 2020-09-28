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
        sensor:{
            type:String,
            required:true
        }
    }
},{
	collection: 'sumDayData4To20mA'
})

sumDay.index({
	"_id.nodeId": 1,
	"value.timestamp" : 1,
}, {
	unique: true
});

module.exports = restful.model('sumDayData4To20mA', sumDay)
	.methods(['get', 'put', 'post']);