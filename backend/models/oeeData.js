/**
 * Schema for storing OEE Data 
 */
const restful = require('node-restful'),
    moment = require('moment-timezone'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//Machine Schema
const oeeDataSchema = new Schema({

    machine_name: {
        type: String
        
    },
    shift_name: {
        type: String
        
    },
    good_production: {
        type:Number 
        
    },
    total_production: {
        type:Number 
        
    },
    total_expected_product_count: {
        type:Number 
        
    },
    oee_percentage:{
        type:Number,
    },
    
    performance:{
        type : Number
    },
    availability:{
        type: Number
    },
    quality:{
        type:Number
    },
    timestamp: {
        type: Date
        
    },
    downtime:{
        type:Number

    },
    reason:{
        type:String
    }


    // create_date: {
    //     type: Date,
    //     default: new Date(new Date().getTime() + 19800000)
    // }

}, {
    collection: 'oee_data'
});

oeeDataSchema.index({"shift_name":1},{"unique":true})


const oeeData = restful.model('oee_data', oeeDataSchema)
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

module.exports = oeeData;