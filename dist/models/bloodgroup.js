"use strict";

/**
 * Created by chrisp on 23/12/2016.
 */

var mongoose = void 0,
    bloodGroupList = void 0,
    bloodGroupSchema = void 0,
    schema = void 0;

mongoose = require("mongoose");
bloodGroupList = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

bloodGroupSchema = {
	_id: {
		type: String,
		required: true,

		enum: bloodGroupList
	},

	bloodType: {
		type: String,
		required: true
	},
	canDonateTo: [{
		type: String,
		required: true,
		enum: bloodGroupList
	}],
	canRecieveFrom: [{
		type: String,
		required: true,
		enum: bloodGroupList
	}],
	antigens: {
		type: String,
		required: true
	},
	antibodies: {
		type: String,
		required: true
	}
};

schema = new mongoose.Schema(bloodGroupSchema);

schema.index({ bloodType: "text" });
schema.index({ canDonateTo: 1 });
schema.index({ canRecieveFrom: 1 });

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

module.exports = schema;
module.exports.bloodGroupSchema = bloodGroupSchema;
//# sourceMappingURL=bloodgroup.js.map