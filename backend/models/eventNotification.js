/**
 * Schema for storing event notifications
 */
const restful = require('node-restful'),
  mongoose = restful.mongoose,
  Schema = mongoose.Schema;

const eventNotificationSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: new Date(new Date().getTime() + 19800000)
  },
  message: {
    type: String,
    required: true
  }
}, {
  collection: 'eventNotification'
});

const eventNotification = restful.model('eventNotification', eventNotificationSchema)
  .methods(['get', 'put', 'post']);

module.exports = eventNotification;