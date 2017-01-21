/**
 * Created by chrisp on 24/12/2016.
 */

"use strict";

var wagner = void 0,
    mongoose = void 0,
    _ = void 0,
    Donor = void 0,
    BloodGroup = void 0,
    models = void 0;

wagner = require("wagner-core");
mongoose = require("mongoose");
_ = require("underscore");

module.exports = function () {

	mongoose.connect("mongodb://localhost:27017/meanstack");

	wagner.factory("db", function () {
		return mongoose;
	});
	Donor = mongoose.model("Donor", require("./donor"), "Donor");
	BloodGroup = mongoose.model("BloodGroup", require("./bloodgroup"), "BloodGroup");

	models = {
		Donor: Donor,
		BloodGroup: BloodGroup
	};

	_.each(models, function (value, key) {
		wagner.factory(key, function () {
			return value;
		});
	});

	return models;
};
//# sourceMappingURL=models.js.map