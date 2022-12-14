const assert = require("assert").strict;

exports.insertDocument = (db, document, collection, callback) => {
  //collection argument will be a string with a campsite that's stored in the mongodb server
  const coll = db.collection(collection);
  coll.insertOne(document, (err, result) => {
    assert.strictEqual(err, null);
    callback(result);
  });
};
exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find().toArray((err, docs) => {
    assert.strictEqual(err, null), callback(docs);
  });
};
exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => {
    assert.strictEqual(err, null), callback(result);
  });
};
exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  /* $set is an update operator. the update object will write over existing information.
  The third parameter is for optional configurations, which we don't need so we pass null */
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.strictEqual(err, null), callback(result);
  });
};
