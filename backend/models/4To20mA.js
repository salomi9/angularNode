/**
 * Schema for storing node data 
 */
const restful = require('node-restful'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//User Schema
const Four2TwentrymAData = new Schema({

    nodeId: {
        type: String,
        required: true,
        index: true
    },
    gatewayId: {
        type: String,
        required: false,
        index: true
    },
    timestamp: {
        type: Date,
        required: true,
        index: true
    },
    sensor: {
        type: String
        // required:
    },
    value: {
        type: Number,
        required: true
    },
    update_date: {
        type: Date,
        default: new Date(new Date().getTime() + 19800000)
    },
    create_date: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'four2TwentymA'
});


Four2TwentrymAData.index({
    nodeId: 1,
    gatewayId: 1,
    timestamp: 1
}, {
    unique: true
});
//DB Middlewares
Four2TwentrymAData.pre('save', function (next) {
    this.update_date = Date();
    next();
});

const nodeData = restful.model('four2TwentymA', Four2TwentrymAData)
    .methods(['get', 'post', 'put', 'delete']);

module.exports = nodeData;