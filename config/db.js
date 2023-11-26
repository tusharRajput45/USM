const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://tusharrajput919:window@test-usm.p4ufnvq.mongodb.net/USM?retryWrites=true&w=majority")
  .then(() => {
    console.log("database connect succesfully");
  })
  .catch(() => {
    console.log("database not connect");
  });

module.exports = mongoose;
 