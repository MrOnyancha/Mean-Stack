/**
 * Created by chrisp on 03/01/2017.
 */

/*eslint no-console: ["error", { allow: ["warn", "error", "log", "dir"] }] */


let mongoose, schema, user, User;

mongoose = require("mongoose");
schema = require("./models");

mongoose.connect("mongodb://localhost:27017/test");

User = mongoose.model("User", schema, "user");


user = new User({
	name : "Onyancha Chrispinus",
	email  : "onyanchachrispinus@gmail.com"
});

user.save((error)=>{
	if(error) {
		console.log(error);
		process.exit(1);
	}
	User.find({email: "onyanchachrispinus@gmail.com"}, (error, docs)=>{
		if(error) {
			console.log(error);
			process.exit(1);
		}

		console.log(docs);
		process.exit(0);
	});

});


