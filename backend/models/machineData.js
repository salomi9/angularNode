/**
 * Schema for storing Machine Data 
 */
const restful = require('node-restful'),
    moment = require('moment-timezone'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//Machine Schema
const machineDataSchema = new Schema({

    companyId: {
        type: Schema.Types.ObjectId,
        //required: true,
        ref: 'company'
    },
    machine_name: {
        type: String
        
    },
    total_expected_product_count: {
        type:Number 
        
    },
  
    // create_date: {
    //     type: Date,
    //     default: new Date(new Date().getTime() + 19800000)
    // }

}, {
    collection: 'machine_data'
});

//machineDataSchema.index({"machine_name":1},{"unique":true})

const machineData = restful.model('machine_data', machineDataSchema)
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

module.exports = machineData;