/**
 * Schema for storing User details
 */
const restful = require('node-restful'),
    mongoose = restful.mongoose,
    crypto = require('crypto'),
    algorithm = 'aes256', // or any other algorithm supported by OpenSSL
    key = '4f53504c2753454e4352595054494f4e',
    iv = 'qawzsexdrcftvgyv',
    Schema = mongoose.Schema;

const gatewaySchema = new Schema({

    gateway_id: {
        type: String,
        required: false,
        unique: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    password: {
        type: String,
    },
    no_meter: {
        type: Number
    },
    pan_id: {
        type: String
    },
    rtc_set: {
        type: Boolean
    },

    gateway_pan: Boolean,
    absent_nodes_in_nw: Number,
    configured_by_gateway: Boolean,
    update_date: {
        type: Date,
        default: Date.now
    },
    create_date: {
        type: Date,
        default: new Date(new Date().getTime() + 19800000)
    }
}, {
    collection: 'gateways'
});

function encrypt(dncdata) {
    //getinput as json data and returns encrypted String to output
    try {
        var cipher = crypto.createCipheriv(algorithm, key, iv);
        var encrypted = cipher.update(dncdata, 'utf8', 'hex') + cipher.final('hex');
        return encrypted
    } catch (e) {
        //when data is not suppported it return null object
        return "null"
    }
}
//DB Middlewares
gatewaySchema.pre('save', function (next) {
    this.update_date = Date();
    if (this.password) {
        this.password = encrypt(this.password)
    }
    next();
});

gatewaySchema.methods.comparePassword = function (candidatePassword, cb) {
	var match = false;
	candidatePassword = encrypt(candidatePassword)
	if (this.password) {
		if (candidatePassword === this.password) {
			match = true;
		}
		cb(match);
	} else {
		match = false;
		cb(match);
	}
};

const Gateway = restful.model('gateways', gatewaySchema)
    .methods(['get', 'post', 'put', 'delete'])
    .before('post', function (req, res, next) {
        req.body.configured_by_gateway = false;
        next()
    })
    .before('put', function (req, res, next) {
        //to encrypt password before put
        if (req.body.password) {
            req.body.encrypted = encrypt(req.body.password) //will update after validation
        }
        req.body.configured_by_gateway = false
        next()
    })
    .before('get', function (req, res, next) {
        req.query.companyId = req.session.userInfo.companyId._id
        next();
    });

module.exports = Gateway;