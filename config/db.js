const mongoose = require("mongoose");
mongoose
  .connect("mongodb://atlas-sql-656176fc6b2a62219272f276-x9cd6.a.query.mongodb.net/USM?ssl=true&authSource=admin")
  .then(() => {
    console.log("database connect succesfully");
  })
  .catch(() => {
    console.log("database not connect");
  });

module.exports = mongoose;
