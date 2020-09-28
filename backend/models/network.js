/**
 * Schema for storing node network
 */
const restful = require('node-restful');
const mongoose = restful.mongoose;
const Schema = mongoose.Schema;

const networkSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    meterId: {
        type: Schema.Types.ObjectId,
        ref: 'node_config',
        required: true,
        unique: true
    },
    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'node_config'
    }],
    zone: {
        type: String,
        required: true
    },
    application: {  
        type: String,
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        required: true,
    }

}, {
    collection: 'network'
});

networkSchema.index({
    name: 1,
    companyId: 1,
    zone: 1
}, {
    unique: true
})

const network = restful.model('network', networkSchema)
    .methods(['get', 'put', 'post', 'delete']).before('get', function (req, res, next) {
        console.log("dejndj", res.locals.bundle)
        next();
    });

module.exports = network;