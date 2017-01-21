"use strict";

/**
 * Created by chrisp on 14/12/2016.
 */

var superAgent = void 0,
    assert = void 0,
    server = void 0,
    app = void 0;

assert = require("assert");
superAgent = require("superagent");
app = require("./routes/api_");

//noinspection Eslint
describe("server", function () {

	//noinspection Eslint
	beforeEach(function () {
		server = app().listen(3000);
	});

	//noinspection Eslint
	afterEach(function () {
		server.close();
	});

	//noinspection Eslint
	it("Print out 'Hello, World!' when user goes to /", function (done) {
		superAgent.get("http://localhost:3000/", function (error, res) {
			assert.ifError(error);
			assert.equal(res.status, 200);
			assert.equal(res.text, "Hello, Worlds!");
			done();
		});
	});
});

//noinspection Eslint
describe("my feature", function () {
	//noinspection Eslint
	it("work ", function () {
		assert.equal("A", "A");
	});
	//noinspection Eslint
	it("fails gracefully", function () {
		assert.notEqual("A", 2);
	});

	//noinspection Eslint
	describe("my innner", function () {
		//noinspection Eslint
		it("inner work ", function () {
			assert.notEqual("XXXX", "YYYY");
		});
		//noinspection Eslint
		it("inner fails ", function () {
			assert.notEqual("A", 2);
		});
	});
});
//# sourceMappingURL=test.js.map