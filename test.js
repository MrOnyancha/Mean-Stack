/**
 * Created by chrisp on 14/12/2016.
 */

let superAgent, assert, server, app;


assert = require("assert");
superAgent = require("superagent");
app = require("./routes/api");


//noinspection Eslint
describe("server", () => {

	//noinspection Eslint
	beforeEach(()=>{
		server = app().listen(3000);
	});

    //noinspection Eslint
	afterEach(()=>{
		server.close();
	});

    //noinspection Eslint
	it("Print out 'Hello, World!' when user goes to /", (done)=> {
		superAgent.get("http://localhost:3000/", (error, res) => {
			assert.ifError(error);
			assert.equal(res.status, 200);
			assert.equal(res.text, "Hello, Worlds!");
			done();
		});


	});
});


//noinspection Eslint
describe("my feature", function (){
    //noinspection Eslint
	it("work ", function(){
		assert.equal("A", "A");
	});
    //noinspection Eslint
	it("fails gracefully",() =>{
		assert.notEqual("A", 2);
	});


    //noinspection Eslint
	describe("my innner", function (){
        //noinspection Eslint
		it("inner work ", function(){
			assert.notEqual("XXXX", "YYYY");
		});
        //noinspection Eslint
		it("inner fails ",() =>{
			assert.notEqual("A", 2);
		});
	});

});