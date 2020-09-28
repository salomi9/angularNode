/**
 * Schema for storing Company payment details
 */
const restful = require('node-restful'),
    moment = require('moment-timezone'),
    mongoose = restful.mongoose,
    Schema = mongoose.Schema;

//Payment Schema
const paymentSchema = new Schema({

    companyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'company'
    },
    amount: {
        type: Number,
        required: true,
        min : [1, "Amount should be more than 0"],
        max : [999999, "Amount should be in 6 digits only"]
    },
    subscription_period: {
        type: Number, // In days
        required: false
    },
    subscription_date: {
        type: Date,
        required: true
    },
    expiry_date: {
        type: Date,
        required: false
    },
    create_date: {
        type: Date,
        default: new Date(new Date().getTime() + 19800000)
    }

}, {
    collection: 'payment_history'
});

const Payment = restful.model('payment_history', paymentSchema)
    .methods(['get', 'put', 'post', 'delete']);

module.exports = Payment;