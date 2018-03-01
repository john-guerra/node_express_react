var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = express.Router();




// Connection URL
const url = "mongodb://localhost:27017";


const findDocuments = function(db, query, callback) {
  // Get the documents collection
  const collection = db.collection("followers");
  // Find some documents
  collection.find(query).limit(20).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found " + docs.length + " records");
    // console.log(docs);
    callback(docs);
  });
};

function getFollowers(query, callback) {

  // Database Name
  const dbName = "twitter_followers";

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, query, callback);

    client.close();
  });

}

/* GET home page. */
router.get("/:query", function(req, res) {
  console.log(req.params);
  getFollowers(
    {user:req.params.query}, 
    (followers) => res.send(followers) 
  );
});

module.exports = router;
