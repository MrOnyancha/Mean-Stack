/**
 * Created by chrisp on 24/08/2016.
 */

/*eslint no-console: ["error", { allow: ["warn", "error", "log", "dir"] }] */


let express, bodyparser, status, api, handleOne, handleMany, hashSalt;

express = require("express");

status = require("http-status");

bodyparser = require("body-parser");

module.exports = (wagner) => {
	api = express.Router();

	api.use(bodyparser.json());
    //
    // api.put("/donor/add", wagner.invoke((Donor)=> {
    //     return (req, res)=> {
    //         try {
    //             var doner = req.body.donor;
    //         } catch (e) {
    //             return res.status(status.BAD_REQUEST).json({error: "No cart specified! "});
    //         }
    //
    //         req.body.donor= doner;
    //         req.body.donor.save((error, user)=> {
    //             if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    //             return res.json({user: user});
    //         });
    //     }
    // }));




    // Simple rest api to return the cordinates
	api.get("/donor/search/:log/:lat/:limit/:range/:bloodgroup", wagner.invoke((Donor)=> {


		return (req, res)=> {
			// var bloodGroup = "B+";

			Donor.find(
				{
					$and:
					[
						{//1350/3963.2
							"loc.coordinates": { $geoWithin: { $centerSphere: [ [  req.params.log,req.params.lat ], req.params.range  ] } }
						},
						{
							"bloodGroup.canDonateTo": { $eq : req.params.bloodgroup}
						}
					]
				}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}}).limit(parseInt(req.params.limit)).exec(handleMany.bind(null, "donors", res));
		};
	}));

	api.get("/donor/getMe/:phone/:passcode", wagner.invoke((Donor)=> {
		hashSalt = "IHngate#bi*Tall";
		// passcode = hashSalt+"Chris123";
		// phone ="+256703326159";
		return (req, res)=> {
			Donor.findOne(
				{
					$and: [
                        {"phone": {$eq: req.params.phone}},
                        {"password": {$eq:(hashSalt+req.params.passcode)}}
					]
				}
                , {score: {$meta: "textScore"}}).exec(handleOne.bind(null, "donors", res));
		};
	}));




	api.get("/bloodgroup/list",wagner.invoke((BloodGroup)=>{
		return (req,res)=>{
			BloodGroup.find().sort({_id: 1}).exec( handleMany.bind(null, "bloodgroups", res));
		};
	}));


	return api;
};

handleOne = (property, res, error, result)=> {
	console.log(result);
	console.log(property);
	if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
	if (!result) return res.status(status.NOT_FOUND).json({error: "Not found"});
	var json = {};
	json[property] = result;
	res.json(json);
};


handleMany = (property, res, error, result)=> {
	if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
	if (!result) return res.status(status.NOT_FOUND).json({error: "Not found"});
	var json = {};
	json[property] = result;
	res.json(json);
};

// vmq-admin listener start address=104.197.118.93 port=1885 --mountpoint /ntvgo --nr_of_acceptors=10 --max_connections=1000