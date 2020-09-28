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
}, {
    collection: 'sumHourData4To20mA'
})

sumHour.index({
    "_id.nodeId": 1,
    "value.timestamp": 1,
}, {
    unique: true
});

module.exports = restful.model('sumHourData4To20mA', sumHour)
    .methods(['get', 'put', 'post']);