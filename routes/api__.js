//noinspection Eslint
/**
 * Created by chrisp on 24/08/2016.
 */

let express, status, bodyParser, api, compute, handleMany;

express = require("express");
status = require("http-status");
bodyParser = require("body-parser");

module.exports = (wagner) => {
	api = express.Router();

	api.use(bodyParser.json());

	api.put("/donor/add", wagner.invoke((Donor)=> {
		return (req, res)=> {
			try {
				var doner = req.body.donor;
			} catch (e) {
				return res.status(status.BAD_REQUEST).json({error: "No cart specified! "});
			}

			req.body.donor= doner;
			req.body.donor.save((error, user)=> {
				if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
				return res.json({user: user});
			});
		};
	}));


    // Simple rest api to return the cordinates
	api.get("/donor/search/:lat/:log/:limit/:range/:bloodgroup", wagner.invoke((Donor)=> {
		return (req, res)=> {
			Donor.find(
				{
					$and: [
                        {$and: [{"location.geoLong": {$gte :compute (req.params.log ,- req.params.range)}}, {"location.geoLat":{$lte :  compute(req.params.log , req.params.range)}}]},
                        {$and: [{"location.geoLat": {$gte : compute(req.params.lat , - req.params.range)}}, {"location.geoLat":{$lte :  compute(req.params.lat,  req.params.range)}}]},
                        {"bloodGroup.canDonateTo":req.params.bloodgroup}
					]
				}
                , {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}}).limit(parseFloat(req.params.limit)).exec(handleMany.bind(null, "donors", res));
		};
	}));

	api.get("/bloodgroup/list",wagner.invoke((BloodGroup)=>{
		return (req,res)=>{
			BloodGroup.find().sort({_id: 1}).exec( handleMany.bind(null, "bloodgroups", res));
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

compute= (a,b)=> {return parseFloat(a)+parseFloat(b);};

handleMany = (property, res, error, result)=> {
	if (error) return res.status(status.INTERNAL_SERVER_ERROR).json({error: error.toString()});
	if (!result) return res.status(status.NOT_FOUND).json({error: "Not found"});
	var json = {};
	json[property] = result;
	res.json(json);
};

