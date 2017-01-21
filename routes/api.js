//noinspection Eslint
/**
 * Created by chrisp on 21/01/2017.
 */

let express, app;

express = require("express");

module.exports = () => {
	app = express();

	app.get("/", (req, res) => {
		res.send("Hello, World!");
	});

	app.get("/user/:user", (req, res)=>{
		res.send("Page for User "+ req.params.user+ " with option "+req.query.options );
	});

	return app;

};

