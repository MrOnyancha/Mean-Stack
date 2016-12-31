"use strict";

var _mocha = require("mocha");

var assert = require("assert"); /**
                                 * Created by chrisp on 14/12/2016.
                                 */

(0, _mocha.describe)("my feature", function () {

	(0, _mocha.it)("work ", function () {
		assert.equal("A", "A");
	});

	(0, _mocha.it)("fails gracefully", function () {
		assert.equal("A", 2);
	});

	(0, _mocha.describe)("my innner", function () {

		(0, _mocha.it)("inner work ", function () {
			assert.equal("XXXX", "YYYY");
		});

		(0, _mocha.it)("inner fails ", function () {
			assert.notEqual("A", 2);
		});
	});
});
//# sourceMappingURL=test.js.map