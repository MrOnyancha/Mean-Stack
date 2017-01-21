/**
 * Created by Eng Chrispinus on 10/12/2016.
 */


/*eslint no-console: ["error", { allow: ["warn", "error", "log", "dir"] }] */

var express, wagner, /*path,*/ logger, app;


express = require("express");
wagner = require("wagner-core");
// path = require("path");
logger = require("morgan");

require("./models/models")(wagner);

// require("./public/javascripts/server/dependencies")(wagner);
// .

app = express();

app.use(logger("dev"));

// wagner.invoke(require("./public/javascripts/server/auth"),{app:app});
// app.use(express.static(path.join(__dirname, "public"),{ maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));


app.use("/api/v1", require("./routes/api")(wagner));

// app.use((req, res, next) => {
// 	let err = new Error("Not Found");
// 	err.status = 404;
// 	next(err);
// });
//
// if (app.get("env") === "development") {
// 	app.use((err, req, res, next) => {
// 		res.status(err.status || 500);
// 		res.render("error", {
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }


app.listen (3000);

console.log("Listening at port 3000");


