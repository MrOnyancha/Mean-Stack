/**
 * Created by chrisp on 23/12/2016.
 */


let mongoose, BloodGroup, donorSchema, schema;

mongoose = require("mongoose");
BloodGroup = require("./bloodgroup");

donorSchema = {
	firstName: {
		type: String,
		required: true,
		lowercase: true
	},
	lastName: {
		type: String,
		required: true,
		lowercase: true
	},
	phone: {
		type: String,
		trim: true,
		required: [true,"User phone number required"],
		match: [ /^(([\+]?(256))|0)?7\(?([8|7|5|0|1|3|9])\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})$/,  "User the formart +xx xxx xxxx xxx "],
		// match: "^(([\\+]?(256))|0)?7\\(?([8|7|5|0|1|3|9])\\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})$"
	},
	// +256 78-5245-009
	// 25678 5245 009
	// 078 5245 009
	// 78 5245 009
	email: {
		type: String,
		trim: true,
		unique: [ true, "Email already exists." ],
		required: [ true,"Email address is required."],
		match: [ /.+@.+\..+/, "User email format XXXX@YYY.PPP"]
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	// onyanchachrispinus@gmail.com
	// vvvv@jjjj.oo
	loc : {
		type : {
			type : String
		},
		coordinates : { type: [ Number ] }
	},
	bloodGroup: BloodGroup.bloodGroupSchema,
	data: {
		// auto: {ty},
		lastDonation: {
			type: Number
		}
	}
};


schema = new mongoose.Schema(donorSchema);



schema.index({firstName: "text"});
schema.index({lastName: "text"});
schema.index({"loc.coordinates": 1});

schema.set("toObject", {virtuals: true});
schema.set("toJSON", {virtuals: true});

module.exports = schema;
module.exports.donorSchema = donorSchema;
