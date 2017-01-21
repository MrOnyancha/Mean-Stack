/**
 * Created by chrisp on 24/12/2016.
 */

"use strict";

let wagner, mongoose, _ ,Donor, BloodGroup, models;

wagner = require("wagner-core");
mongoose = require("mongoose");
_ = require("underscore");

module.exports = ()=> {

	mongoose.connect("mongodb://localhost:27017/meanstack");

	wagner.factory("db", ()=>{return mongoose;});
	Donor = mongoose.model("Donor", require("./donor"), "Donor");
	BloodGroup = mongoose.model("BloodGroup", require("./bloodgroup"), "BloodGroup");

	models =
	{
		Donor : Donor,
		BloodGroup : BloodGroup
	};

	_.each(models, (value, key) => {
		wagner.factory(key, () => {
			return value;
		});
	});

	return models;
};


