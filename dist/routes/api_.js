"use strict";

//noinspection Eslint
/**
 * Created by chrisp on 21/01/2017.
 */

var express = void 0,
    app = void 0;

express = require("express");

module.exports = function () {
	app = express();

	app.get("/", function (req, res) {
		res.send("Hello, World!");
	});

	app.get("/user/:user", function (req, res) {
		res.send("Page for User " + req.params.user + " with option " + req.query.options);
	});

	return app;
};
//# sourceMappingURL=api_.js.map