/**
 * Schema for storing Machine Data 
 */
const restful = require('node-restful'),
    moment = require('moment-timezone'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//Machine Schema
const machineShiftDataSchema = new Schema({

   
    machine_name: {
        type: String
        
    },
    shift_name: {
        type: String
        
    },
    expected_shift_count: {
        type:Number 
        
    },
  
    // create_date: {
    //     type: Date,
    //     default: new Date(new Date().getTime() + 19800000)
    // }

}, {
    collection: 'machine_shift_data'
});

machineShiftDataSchema.index({"machine_name":1},{"unique":true})

const machineShiftData = restful.model('machine_shift_data', machineShiftDataSchema)
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

module.exports = machineShiftData;