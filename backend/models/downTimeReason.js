/**
 * Schema for storing Down Time Reasons Data 
 */
const restful = require('node-restful'),
    moment = require('moment-timezone'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//Machine Schema
const downTimeReasonSchema = new Schema({

    
    reason: {
        type: String
        
    }
    // create_date: {
    //     type: Date,
    //     default: new Date(new Date().getTime() + 19800000)
    // }

}, {
    collection: 'down_time_reason'
});

const downTimeReason = restful.model('down_time_reason', downTimeReasonSchema)
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

module.exports = downTimeReason;