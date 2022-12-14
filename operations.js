exports.insertDocument = (db, document, collection) => {
  //collection argument will be a string with a campsite that's stored in the mongodb server
  /*  when no callback is given, node js driver automatically returns a promise. To do this,
  we prepend coll.insertOne with return*/
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find().toArray();
};
exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};
exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  /* $set is an update operator. the update object will write over existing information.
  The third parameter is for optional configurations, which we don't need so we pass null */
  return coll.updateOne(document, { $set: update }, null);
};
