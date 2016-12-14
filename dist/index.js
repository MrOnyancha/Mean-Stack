"use strict";

/**
 * Created by Eng Chrispinus on 10/12/2016.
 */

/*eslint no-console: ["error", { allow: ["warn", "error", "log", "dir"] }] */
/**
 *Initialise the 'MongoClient', 'assert', and the 'url' with the
 * object for the mongodb driver connetion, and assert library.
 */

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:27017/meanstack";

/**
 * build function that takes in the database connection db,
 * and the call back function since the javascript will be
 * running asynchronously.
 * @param db
 * @param callback
 */

var insertDocument = function insertDocument(db, callback) {
    db.collection("restaurants").insertOne({
        "address": {
            "street": "2 Avenue",
            "zipcode": "10075",
            "building": "1480",
            "coord": [-73.9557413, 40.7720266]
        },
        "borough": "Manhattan",
        "cuisine": "Italian",
        "grades": [{
            "date": new Date("2014-10-01T00:00:00Z"),
            "grade": "A",
            "score": 11
        }, {
            "date": new Date("2014-01-16T00:00:00Z"),
            "grade": "B",
            "score": 17
        }],
        "name": "Vella",
        "restaurant_id": "41704620"
    }, function (err) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        console.log("Calling the INSERT call back");
        callback();
    });
};

/**
 * build function that takes in the database connection db,
 * and the call back function since the javascript will be
 * running asynchronously.
 * @param db
 * @param callback
 */

var findRestaurants = function findRestaurants(db, callback) {
    db.collection("restaurants").find().toArray(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(JSON.stringify(doc));
        } else {
            console.log("Calling the FIND call back ");
            callback();
        }
    });
};

/**
 * build function that takes in the database connection db,
 * and the call back function since the javascript will be
 * running asynchronously.
 * @param db
 * @param callback
 */

var updateRestaurants = function updateRestaurants(db, callback) {
    db.collection("restaurants").updateOne({ "name": "Vella", "grades.grade": "B" }, {
        $set: { "cuisine": "American (New)", "grades.$.score": 20 },
        $currentDate: { "lastModified": true }
    }, function (err, results) {
        console.log(results);
        console.log("Calling the UPDATE call back ");
        callback();
    });
};

/**
 * build function that takes in the database connection db,
 * and the call back function since the javascript will be
 * running asynchronously.
 * @param db
 * @param callback
 */

var removeRestaurants = function removeRestaurants(db, callback) {
    db.collection("restaurants").deleteMany({ "borough": "Manhattan" }, function (err, results) {
        console.log(results);
        callback();
    });
};

/**
 * Open a connection to the database and the function above
 * with their callback functions that will close the database
 * connection db each time.
 */
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    if (db != null) console.log("DB to database open 1");

    insertDocument(db, function () {
        console.log("TEST 1");
        db.close();
    });

    console.log("Passed 1");

    findRestaurants(db, function () {
        db.close();
    });

    console.log("Passed 2");
    updateRestaurants(db, function () {
        db.close();
    });

    console.log("Passed 3");
    findRestaurants(db, function () {
        db.close();
    });

    console.log("Passed 4");
    removeRestaurants(db, function () {
        db.close();
    });

    console.log("Passed 5");
    findRestaurants(db, function () {
        db.close();
    });

    process.exit(0);
});
//# sourceMappingURL=index.js.map