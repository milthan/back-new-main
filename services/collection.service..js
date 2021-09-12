const db = require("../models");
const Collection = db.collection;

const insertCollectionForUser = (userID) => {
    Collection.create({
        userID: userID,
      })
        .then(() => {
          res.send({ message: "Collection is ready to use." });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
}
module.exports = {insertCollectionForUser}