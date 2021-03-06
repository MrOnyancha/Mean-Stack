"use strict";

/**
 * Created by chrisp on 24/08/2016.
 */

/*eslint no-console: ["error", { allow: ["warn", "error", "log", "dir"] }] */

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
    app = void 0,
    hashSalt = void 0;

superagent = require("superagent");
assert = require("assert");
status = require("http-status");
express = require("express");
wagner = require("wagner-core");

URL_ROOT = "http://localhost:3000";
hashSalt = "IHngate#bi*Tall";
// var PRODUCT_ID = "000000000000000000000001";

describe("Blood Group API ", function () {
	before(function () {
		app = express();
		require("./../models/models")(wagner);

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

	after(function () {
		server.close();
	});

	beforeEach(function (done) {

		BloodGroup.remove({}, function (error) {
			assert.ifError(error);
			Donor.remove({}, function (error) {
				assert.ifError(error);
				done();
			});
		});
	});

	beforeEach(function (done) {
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
			phone: "+256703326159",
			email: "onyanchachrispinus@gmail.com",
			password: hashSalt + "Chris123",
			loc: { coordinates: [32.582520, 0.347596] },
			bloodGroup: bloodgroup[0],
			data: {
				lastDonation: 1546453
			}
		}, {
			firstName: "Patric",
			lastName: "OPut",
			phone: "+256787453422",
			email: "on@gmail.com",
			password: hashSalt + "Chris1234",
			loc: { coordinates: [32.682520, 0.547596] },
			bloodGroup: bloodgroup[4],
			data: {
				lastDonation: 1546453
			}
		}, {
			firstName: "Onango",
			lastName: "denis",
			phone: "+256709815909",
			email: "ts@gmail.com",
			password: hashSalt + "Chris12345",
			loc: { coordinates: [32.583520, 0.347296] },
			bloodGroup: bloodgroup[5],
			data: {
				lastDonation: 1566453
			}
		}];

		BloodGroup.create(bloodgroup, function (error, bloodgroups) {
			assert.ifError(error);
			// console.log("The bloodgroups will be ", bloodgroups);
			// Donor.create(donors, (error, donors)=> {
			// 	assert.ifError(error);
			// console.log("The donors will be ", donors);
			done();
			// });
		});
	});

	it("Load the first User in the database ", function (done) {

		var url = URL_ROOT + "/donor/search/32.583520/0.347296/1/10/B+";
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