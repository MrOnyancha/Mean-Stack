"use strict";

/**
 * Created by chrisp on 03/01/2017.
 */

/*eslint no-console: ["error", { allow: ["warn", "error", "log", "dir"] }] */

var mongoose = void 0,
    schema = void 0,
    user = void 0,
    User = void 0;

mongoose = require("mongoose");
schema = require("./models");

mongoose.connect("mongodb://localhost:27017/test");

User = mongoose.model("User", schema, "user");

user = new User({
	name: "Onyancha Chrispinus",
	email: "onyanchachrispinus@gmail.com"
});

user.save(function (error) {
	if (error) {
		console.log(error);
		process.exit(1);
	}
	User.find({ email: "onyanchachrispinus@gmail.com" }, function (error, docs) {
		if (error) {
			console.log(error);
			process.exit(1);
		}

		console.log(docs);
		process.exit(0);
	});
});
//# sourceMappingURL=Usage.js.map