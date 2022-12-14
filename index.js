/* this acts as a client for the mongo server. Requires the mongodb node driver, and from the driver,
the mongoClient object.
 */

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert").strict;

//here we are setting up a connection to the mongo db server
const url = "mongodb://localhost:27017/";

//nucamp is the database we want to connect to
const dbname = "nucampsite";

//this connects us to the mongo db server
/*useUnifiedTopology: true enables a major rewrite and update of the topology layer of the mongo db driver. 
It is recommended to prevent deprecated warnings from showing up.*/
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
        /* ops is short for operations. Depending on the method, it can contain different values. In this case, it's a
        an array with the document that was inserted */
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
