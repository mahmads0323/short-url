const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const ConnectDataBase = async (connectionString) => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => console.log("Database Connected"))
    .catch((e) => console.log("Database Connection erroe", e));
};

module.exports = ConnectDataBase;
