const MongoClient = require("mongodb/lib/mongo_client");

const mongoClient = require("mongodb").MongoClient;
const assert = require("assert").strict;

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

//this connects us to the mongo db server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  //checking if the first argument strictly equals the 2nd (err === null)
  //if they don't match, the application will quit. If they do, we continue on
  assert.strictEqual(err, null);

  console.log("Connected correctly to server");
  //this connects us to the nucampsite database on the mongo db server
  const db = client.db(dbname);

  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped Collection", result);

    const collection = db.collection("campsites");

    collection.insertOne(
      { name: "Breadcrumb Trail Campground", description: "Test" },
      (err, result) => {
        assert.strictEqual(err, null);
        //ops is short for operations
        console.log("Insert Document:", result.ops);
        /*printing all documents in the collection to the console. To do this, we give it
        an empty parameter list*/
        /* toArray from mongoDB driver will convert documents to an array of objects*/
        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, null);
          console.log("Found documents:", docs);

          client.close();
        });
      }
    );
  });
});
