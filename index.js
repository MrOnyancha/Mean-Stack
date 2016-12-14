/**
 * Created by Eng Chrispinus on 10/12/2016.
 */


/*eslint no-console: ["error", { allow: ["warn", "error", "log", "dir"] }] */


var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:27017/meanstack";


var insertDocument = (db, callback) => {
    db.collection("restaurants").insertOne({
        "address": {
            "street": "2 Avenue",
            "zipcode": "10075",
            "building": "1480",
            "coord": [-73.9557413, 40.7720266]
        },
        "borough": "Manhattan",
        "cuisine": "Italian",
        "grades": [
            {
                "date": new Date("2014-10-01T00:00:00Z"),
                "grade": "A",
                "score": 11
            },
            {
                "date": new Date("2014-01-16T00:00:00Z"),
                "grade": "B",
                "score": 17
            }
        ],
        "name": "Vella",
        "restaurant_id": "41704620"
    }, function (err) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        console.log("Calling the INSERT call back");
        callback();
    });
};


var findRestaurants = function (db, callback) {
    db.collection("restaurants").find().toArray(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            console.log("Calling the FIND call back ");
            callback();
        }
    });
};


var updateRestaurants = function (db, callback) {
    db.collection("restaurants").updateOne(
        {"name": "Vella", "grades.grade": "B"},
        {
            $set: {"cuisine": "American (New)", "grades.$.score": 20},
            $currentDate: {"lastModified": true}
        }, function (err, results) {
            console.log(results);
            console.log("Calling the UPDATE call back ");
            callback();
        });
};


var removeRestaurants = function (db, callback) {
    db.collection("restaurants").deleteMany(
        {"borough": "Manhattan"},
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};


MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    insertDocument(db, function () {
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
