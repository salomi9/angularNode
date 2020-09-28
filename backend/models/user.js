/**
 * Schema for storing user details
 */

const crypto = require('crypto'),
	restful = require('node-restful'),
	mongoose = restful.mongoose,
	Schema = mongoose.Schema,
	userTypes = ["Admin", "Support", "IT Admin", "Plant Manager", "Plant Engineer"];

//User Schema
const UserSchema = new Schema({
	companyId: {
		type: Schema.Types.ObjectId,
		ref: 'company'
	},
	user_image: {
		type: String
	},
	user_type: {
		type: String,
		enum: userTypes,
	},
	company_type: {
		type: String,
		enum: ['osl', 'Company']
	},
	username: {
		type: String,
		required: true,
		unique: true //added for unique username
	},
	name: {
		type: String,
		required: false
	},
	mobile: {
		type: Number,
		unique: true
	},
	password: {
		type: String
	},
	block: {
		type: Boolean,
		default: false
	},
	created_by: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	reset: {
		used: {
			type: Boolean,
			default: false
		},
		token: {
			type: String
		}
	},
	email: {
		type: String,
		required: false,
		unique: true,
		sparse: true
	},
	mailConfirmed: {
		required: true,
		type: Boolean,
		default: false
	},
	phoneConfirmed: {
		required: true,
		type: Boolean,
		default: false
	},
	confirmPhone: {
		create_time: {
			type: Date,
			default: new Date(),
			required: false
		},
		vpwd: {
			type: Number
		}

	},
	confirmMail: {
		used: {
			type: Boolean,
			default: false
		},
		token: {
			type: String
		}
	},
	create_date: {
		type: Date,
		default: new Date(new Date().getTime() + 19800000)
	},
	update_date: {
		type: Date,
		default: new Date(new Date().getTime() + 19800000)
	}
}, {
	collection: 'users'
});

//DB Middlewares

UserSchema.pre('save', function (next) {
	const user = this;
	user.update_date = Date();
	if (user.password) {
		const cipher = crypto.createCipher('aes192', 'erqAFxxCshjKlaq');
		cipher.update(user.password, 'utf8', 'hex');
		user.password = cipher.final('hex');
	}
	next();

});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	var match = false;
	const cipher = crypto.createCipher('aes192', 'erqAFxxCshjKlaq');
	cipher.update(candidatePassword, 'utf8', 'hex');
	candidatePassword = cipher.final('hex');

	if (this.password) {
		if (candidatePassword === this.password) {
			match = true;
		}
		console.log("here ", candidatePassword, this.password);
		cb(match);
	} else {
		match = undefined;
		cb(match);
	}
};

UserSchema.methods.toJSON = function () {
	const obj = this.toObject()
	delete obj.password;
	return obj;
}

module.exports = [restful.model('user', UserSchema)
	.methods(['get', 'post', 'put'])
	.before('post', function (req, res, next) {
		req.body.password = "123"
		next()
	}),
	userTypes];