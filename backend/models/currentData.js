/**
 * Schema for storing Current  value coming from node 
 */
const restful = require('node-restful'),
    moment = require('moment-timezone'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//Current Schema
const currentDataSchema = new Schema({

    machine_name: {
        type: String
        
    },
    current: {
        type:Number 
        
    },
  
    timestamp: {
        type: Date,
    }

}, {
    collection: 'current_data'
});

currentDataSchema.index({"machine_name":1},{"unique":true})

const currentData = restful.model('current_data', currentDataSchema)
    .methods(['get', 'put', 'post', 'delete'])
    .before('post', function (req, res, next) {
        next()
    })
    .before('put', function (req, res, next) {
        // //to encrypt password before put
        // if (req.body.password) {
        //     req.body.encrypted = encrypt(req.body.password) //will update after validation
        // }
        // req.body.configured_by_gateway = false
        next()
    })
    .before('get', function (req, res, next) {
        //req.query.companyId = req.session.userInfo.companyId._id
        next();
    });

module.exports = currentData;