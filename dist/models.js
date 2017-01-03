"use strict";

var mongoose = void 0,
    schema = void 0;

mongoose = require("mongoose");
schema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true,
		match: /.+@.+\..+/,
		lowercase: true
	},

	loggedInCount: {
		type: Number,
		default: 0
	}
});

module.exports = schema;
//# sourceMappingURL=models.js.map