/**
 * Company Details Schema
 */
const restful = require('node-restful');
const mongoose = restful.mongoose;

const Schema = mongoose.Schema;

//Company Schema
const companySchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        sparse: true
    },
    company_code: {
        type: String,
        required: true,
        unique: true
    },
    activate: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: new Date(new Date().getTime() + 19800000)
    },
    expiry_date: {
        type: Date
    },
    logo: {
        type: String
    },
    powerfactor:{
        type:Object,
        default:'',
        required: false
    },
    targetSet: {
        type: Object,
        default:'',
        required: false
    },
    costPerUnit: {
        type : Number
    }
}, {
    collection: 'company'
});

//DB Middlewares

//Export
const Company = restful.model('company', companySchema)
    .methods(['get', 'put', 'post', 'delete'])

module.exports = Company;