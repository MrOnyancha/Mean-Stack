/**
 * Created by chrisp on 19/02/2017.
 */

var setUpAuth;

setUpAuth = (Donor, app) => {
	let passport = require("passport");
	let FacebookStrategy = require("passport-facebook").Strategy;

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		Donor.findOne({_id: id}).exec(done);
	});

	passport.use(new FacebookStrategy(
		{
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		},
        (accessToken, refreshToken, profile, done) => {
	if (!profile.emails || !profile.emails.length) return done("No emails associated with this account!");

	Donor.findOneAndUpdate(
                {"data.auto": profile.id},
		{
			$set: {
				"profile.name": profile.emails[0].value,
				"profile.picture" : "http://graph.facebook.com/"+ profile.id.toString() +"/picture?type=large"
			}
		},
		{
			"new" : true,
			upsert : true,
			runValidators : true
		},(error, donor) => {
			done(error, donor);
		}
            );
}
    ));


	app.use(require("express-session")({secret: "This is a secret"}));

	app.use(passport.initialize());

	app.use(passport.session());

	app.get("/auth/facebook",passport.authenticate("facebook",{scope:["email"]}));

	app.get("/auth/facebook/callback",passport.authenticate("facebook",{failureRedirect:"/fail"}),
       (req, res) => {
	res.send("Welcome", req.user.profile.username);
});




};

module.exports = setUpAuth;