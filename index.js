/* this acts as a client for the mongo server. Requires the mongodb node driver, and from the driver,
the mongoClient object.
 */

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert").strict;
const dboper = require("./operations");

//here we are setting up a connection to the mongo db server
const url = "mongodb://localhost:27017/";

//nucamp is the database we want to connect to
const dbname = "nucampsite";

//this connects us to the mongo db server
/*useUnifiedTopology: true enables a major rewrite and update of the topology layer of the mongo db driver. 
It is recommended to prevent deprecated warnings from showing up.*/
//1
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  //checking if the first argument strictly equals the 2nd (err === null)
  //if they don't match, the application will quit. If they do, we continue on
  assert.strictEqual(err, null);

  console.log("Connected correctly to server");
  //this connects us to the nucampsite database on the mongo db server
  const db = client.db(dbname);
  //2
  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped Collection:", result);
    //3
    dboper.insertDocument(
      db,
      { name: "Breadcrumb Trail Campground", description: "Test" },
      "campsites",
      (result) => {
        console.log("Insert Document:", result.ops);
        //4
        dboper.findDocuments(db, "campsites", (docs) => {
          console.log("Found Documents:", docs);
          //5
          dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" },
            "campsites",
            (result) => {
              console.log("Updated Document Count:", result.result.nModified);
              //6
              dboper.findDocuments(db, "campsites", (docs) => {
                console.log("Found Documents:", docs);
                //7
                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  (result) => {
                    console.log("Deleted Document Count:", result.deletedCount);

                    client.close();
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});
