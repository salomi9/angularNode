/**
 * Schema for storing Shift Data
 */
const restful = require("node-restful"),
  moment = require("moment-timezone"),
  mongoose = restful.mongoose,
  Schema = mongoose.Schema;

//Shift Schema
const shiftDataSchema = new Schema(
  {

   
    companyId: {
      type: Schema.Types.ObjectId,
      //required: true,
      ref: 'company'
    },  
    shift_name:{
      type:String
    }, 
    shift_start_time: {
      type: String,
      //required: true
    },
    shift_end_time: {
      type: String,
      //required: true
    },
    shiftbreakone_start_time: {
      type: String,
      //required: true
    },
    shiftbreakone_end_time: {
      type: String,
      //required: true
    },
    shiftbreaktwo_start_time: {
      type: String,
      //required: true
    },
    shiftbreaktwo_end_time: {
      type: String,
      //required: true
    }
  },
  {
    collection: "shift_data"
  }
);

const shift = restful
  .model("shift_data", shiftDataSchema)
  .methods(["get", "put", "post", "delete"])
  .before("post", function(req, res, next) {
    next();
  })
  .before("put", function(req, res, next) {
    // //to encrypt password before put
    // if (req.body.password) {
    //     req.body.encrypted = encrypt(req.body.password) //will update after validation
    // }
    // req.body.configured_by_gateway = false
    next();
  })
  .before("get", function(req, res, next) {
    //req.query.companyId = req.session.userInfo.companyId._id
    next();
  });

module.exports = shift;
