"use strict";

/**
 * Created by chrisp on 24/08/2016.
 */

var express = void 0,
    status = void 0,
    bodyparser = void 0,
    api = void 0,
    compute = void 0,
    handleMany = void 0;

express = require("express");
status = require("http-status");
bodyparser = require("body-parser");

module.exports = function (wagner) {
	api = express.Router();

	api.use(bodyparser.json());

	api.put("/donor/add", wagner.invoke(function (Donor) {
		return function (req, res) {
			try {
				var doner = req.body.donor;
			} catch (e) {
				return res.status(status.BAD_REQUEST).json({ error: "No cart specified! " });
			}

			req.body.donor = doner;
			req.body.donor.save(function (error, user) {
				if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
				return res.json({ user: user });
			});
		};
	}));

	// Simple rest api to return the cordinates
	api.get("/donor/search/:lat/:log/:limit/:range/:bloodgroup", wagner.invoke(function (Donor) {
		return function (req, res) {
			Donor.find({
				$and: [{ $and: [{ "location.geoLong": { $gte: compute(req.params.log, -req.params.range) } }, { "location.geoLat": { $lte: compute(req.params.log, req.params.range) } }] }, { $and: [{ "location.geoLat": { $gte: compute(req.params.lat, -req.params.range) } }, { "location.geoLat": { $lte: compute(req.params.lat, req.params.range) } }] }, { "bloodGroup.canDonateTo": req.params.bloodgroup }]
			}, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).limit(parseFloat(req.params.limit)).exec(handleMany.bind(null, "donors", res));
		};
	}));

	api.get("/bloodgroup/list", wagner.invoke(function (BloodGroup) {
		return function (req, res) {
			BloodGroup.find().sort({ _id: 1 }).exec(handleMany.bind(null, "bloodgroups", res));
		};
	}));

	return api;
};

// var handleOne = (property, res, error, result)=> {
//     console.log(result);
//     console.log(property);
//     if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
//     if (!result) return res.status(status.NOT_FOUND).json({error: "Not found"});
//     var json = {};
//     json[property] = result;
//     res.json(json);
// };

compute = function compute(a, b) {
	return parseFloat(a) + parseFloat(b);
};

handleMany = function handleMany(property, res, error, result) {
	if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
	if (!result) return res.status(status.NOT_FOUND).json({ error: "Not found" });
	var json = {};
	json[property] = result;
	res.json(json);
};
//# sourceMappingURL=api.js.map