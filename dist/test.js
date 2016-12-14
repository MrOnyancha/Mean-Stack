'use strict';

/**
 * Created by chrisp on 14/12/2016.
 */

var assert = require("assert");

describe('my feature', function () {

    it('work ', function () {
        assert.equal('A', "A");
    });

    it("fails gracefully", function () {
        assert.equal('A', 2);
    });

    describe('my innner', function () {

        it('inner work ', function () {
            assert.equal('XXXX', "YYYY");
        });

        it("inner fails ", function () {
            assert.notEqual('A', 2);
        });
    });
});
//# sourceMappingURL=test.js.map