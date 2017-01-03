let mongoose, schema;

mongoose = require("mongoose");
schema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		},
		email: {
			type: String,
			require: true,
			match: /.+@.+\..+/ ,
			lowercase: true
		}
        ,
		loggedInCount: {
			type: Number,
			default: 0
		}
	}
);

module.exports = schema;

