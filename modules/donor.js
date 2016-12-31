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
        // match: "/^+/d{10}"
	},
	email: {
		type: String,
		required: true,
        // match:
	},
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
