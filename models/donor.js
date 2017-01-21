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
		required: true,
		match: /^(([\+]?(256))|0)?7\(?([8|7|5|0|1|3|9])\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})$/
		// match: "^(([\\+]?(256))|0)?7\\(?([8|7|5|0|1|3|9])\\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})$"
	},
	// +256 78-5245-009
	// 25678 5245 009
	// 078 5245 009
	// 78 5245 009
	email: {
		type: String,
		required: true,
		match: /.+@.+\..+/
	},
	// onyanchachrispinus@gmail.com
	// vvvv@jjjj.oo
	location: {
		geoLong: {
			type: Number,
			required: true
		},
		geoLat: {
			type: Number,
			required: true
		}
	},
	bloodGroup: BloodGroup.bloodGroupSchema,
	data: {
		lastDonation: {
			type: Number
		}
	}
};


schema = new mongoose.Schema(donorSchema);



schema.index({firstName: "text"});
schema.index({lastName: "text"});
schema.index({"location.geoLong": 1});
schema.index({"location.geoLat": 1});

schema.set("toObject", {virtuals: true});
schema.set("toJSON", {virtuals: true});

module.exports = schema;
module.exports.donorSchema = donorSchema;