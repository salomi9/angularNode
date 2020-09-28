/**
 * Schema for storing machine process Data 
 */
//let mongoose = require('mongoose')
const restful = require('node-restful'),
    moment = require('moment-timezone'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//Machine Schema
const machineProcessSchema = new Schema({

    
    machine_name: {
        type: String
        
    },
    process_name:{
        type:String
    },
    high_current:{
        type:Number

    },
    low_current:{
        type:Number

    }
    
    
    // create_date: {
    //     type: Date,
    //     default: new Date(new Date().getTime() + 19800000)
    // }

}, {
    collection: 'machine_process'
});


const machineProcess = restful.model('machine_process', machineProcessSchema)
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

module.exports = machineProcess;