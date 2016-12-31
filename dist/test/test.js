"use strict";

var _mocha = require("mocha");

var superagent = void 0,
    assert = void 0,
    status = void 0,
    express = void 0,
    wagner = void 0,
    URL_ROOT = void 0,
    server = void 0,
    Donor = void 0,
    BloodGroup = void 0,
    models = void 0,
    app = void 0; /**
                   * Created by chrisp on 24/08/2016.
                   */


superagent = require("superagent");
assert = require("assert");
status = require("http-status");
express = require("express");
wagner = require("wagner-core");

URL_ROOT = "http://localhost:3000";
// var PRODUCT_ID = "000000000000000000000001";

(0, _mocha.describe)("Blood Group API ", function () {
	(0, _mocha.before)(function () {
		app = express();
		require("./../public/javascripts/server/models")(wagner);

		models = wagner.invoke(function (Donor, BloodGroup) {
			return {
				Donor: Donor,
				BloodGroup: BloodGroup
			};
		});

		Donor = models.Donor;
		BloodGroup = models.BloodGroup;

		app.use(require("./../routes/api")(wagner));

		server = app.listen(3000);
	});

	(0, _mocha.after)(function () {
		server.close();
	});

	(0, _mocha.beforeEach)(function (done) {

		BloodGroup.remove({}, function (error) {
			assert.ifError(error);
			Donor.remove({}, function (error) {
				assert.ifError(error);
				done();
			});
		});
	});

	(0, _mocha.beforeEach)(function (done) {
		var bloodgroup = void 0,
		    donors = void 0;

		bloodgroup = [{
			_id: "A+",
			bloodType: "A",
			canDonateTo: ["A+", "AB+"],
			canRecieveFrom: ["A+", "A-", "O+", "O-"],
			antigens: "A",
			antibodies: "Anti-B"
		}, {
			_id: "A-",
			bloodType: "A",
			canDonateTo: ["A+", "AB+"],
			canRecieveFrom: ["A-", "O-"],
			antigens: "A",
			antibodies: "Anti-B"
		}, {
			_id: "B+",
			bloodType: "B",
			canDonateTo: ["AB+", "B+"],
			canRecieveFrom: ["B+", "B-", "O+", "O-"],
			antigens: "B",
			antibodies: "Anti-A"
		}, {
			_id: "B-",
			bloodType: "B",
			canDonateTo: ["AB+", "B+", "AB-", "B-"],
			canRecieveFrom: ["B-", "O-"],
			antigens: "B",
			antibodies: "Anti-A"
		}, {
			_id: "AB+",
			bloodType: "AB",
			canDonateTo: ["AB+"],
			canRecieveFrom: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
			antigens: "A and B",
			antibodies: "None"
		}, {
			_id: "AB-",
			bloodType: "AB",
			canDonateTo: ["AB-", "AB+"],
			canRecieveFrom: ["A-", "B-", "AB-", "O-"],
			antigens: "A and B",
			antibodies: "None"
		}, {
			_id: "O+",
			bloodType: "O",
			canDonateTo: ["A+", "B+", "AB+", "O+"],
			canRecieveFrom: ["O+", "O-"],
			antigens: "None",
			antibodies: "Anti-B and Anti-A"
		}, {
			_id: "O-",
			bloodType: "O",
			canDonateTo: ["O-"],
			canRecieveFrom: ["O-"],
			antigens: "A",
			antibodies: "Anti-B and Anti-A"
		}];

		donors = [{
			firstName: "Onyancha",
			lastName: "Chrispinus",
			phone: "+254703326159",
			email: "onyanchachrispinus@gmail.com",
			location: {
				geoLong: 50.00,
				geoLat: 50.00
			},
			bloodGroup: bloodgroup[0],
			data: {
				lastDonation: 1546453
			}
		}, {
			firstName: "Patric",
			lastName: "OPut",
			phone: "+254767453422",
			email: "on@gmail.com",
			location: {
				geoLong: 35.00,
				geoLat: 25.00
			},
			bloodGroup: bloodgroup[4],
			data: {
				lastDonation: 1546453
			}
		}, {
			firstName: "Onango",
			lastName: "denis",
			phone: "+256709815909",
			email: "ts@gmail.com",
			location: {
				geoLong: 45.00,
				geoLat: 60.00
			},
			bloodGroup: bloodgroup[5],
			data: {
				lastDonation: 1566453
			}
		}];

		BloodGroup.create(bloodgroup, function (error, bloodgroups) {
			assert.ifError(error);
			Donor.create(donors, function (error, donors) {
				assert.ifError(error);
				done();
			});
		});
	});

	(0, _mocha.it)("Load the first User in the database ", function (done) {

		var url = URL_ROOT + "/donor/search/50.9/50.9/10/10";
		superagent.get(url, function (error, res) {
			var results = "";
			assert.ifError(error);
			assert.equal(res.status, status.OK);
			assert.doesNotThrow(function () {
				results = JSON.parse(res.text).donors;
			});
			assert.ok(results.length, 1);
			assert.ok(results[0].firstName, "Onyancha");
			done();
		});
	});
});
//# sourceMappingURL=test.js.map