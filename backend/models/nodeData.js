/**
 * Schema for storing node data 
 */
const restful = require('node-restful'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//User Schema
const nodeDataSchema = new Schema({

    node_id: {
        type: String,
        required: true,
        index:true
    },
    gateway_id: {
        type: String,
        required: false,
        index:true
    },
    timestamp: {
        type: Date,
        required: true,
        index:true
    },
    value: {
        type: Array,
        default: [],
        required: false
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
    collection: 'node_data'
});

nodeDataSchema.index({"node_id":1, "timestamp":1},{"unique":true})

//DB Middlewares
nodeDataSchema.pre('save', function (next) {
    this.update_date = Date();
    next();
});

const nodeData = restful.model('node_data', nodeDataSchema)
    .methods(['get', 'post', 'put', 'delete']);

module.exports = nodeData;


//Need to remove Multiple docs from node_Data Collection
// db.node_data.aggregate([

//     //{
//     //  "$match":{"node_id" : "0013A20040D7BEE9"}
//     //},
//     {
//       "$group":{"_id":{"nid":"$node_id","ts":"$timestamp"},"cnt":{"$sum":1},"nid":{"$last":"$node_id"}}
//     },
//     {
//       "$match":{
//         "cnt":{"$gt":1}
//       }
//     }
//       ])