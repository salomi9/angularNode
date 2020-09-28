/**
 * Schema for storing node configuration
 */
const restful = require('node-restful'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

const nodeConfigSchema = new Schema({
    address: {
        type: String,
        required: false,
        unique: true
    },
    gatewayId: {
        type: Schema.Types.ObjectId,
        ref: 'gateways'
    },
    pan_id: {
        type: String
    },
    type: {
        type: String,
        enum: ["Energy", "Modbus", "4 to 20 mA", "PFC", "0 to 15 V", "Analog Input"],
        required: true
    },
    ct_ratio: {
        type: Number
    },
    pt_ratio: {
        type: Number
    },
    typeCode: {
        type: Number,
        enum: [1, 2, 2.1, 3, 4, 5, 6, 7], // [1-> Energy, 2-> Modbus Master, 2.1-> Modbus Slaves, 3-> 4to20mA, 4-> PFC, 5-> 0to15mV]
        required: true
    },
    colorRange:{
        values:[Number],
        ascending:Boolean
    },
    config: {
        type: Object,
        default: {}
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
    collection: 'node_config'
});

//DB Middlewares
nodeConfigSchema.pre('save', function (next) {
    this.update_date = Date();
    next();
});

const nodeConfig = restful.model('node_config', nodeConfigSchema)
    .methods(['get', 'post', 'put', 'delete']);

module.exports = nodeConfig;