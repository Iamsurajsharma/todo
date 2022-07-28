const mongoose = require("mongoose");

class Mongo {
  /**
   * connects to mongo database.
   * @param {*} uri connection string
   */
  async connectDb(uri) {
    mongoose.connect(uri).then(
      () => {
        console.log(`Success: database connected to ${uri}`);
      },
      (error) => {
        console.log(`Error: database failed to connect ${uri}`);
        console.log(`Error:`, error);
      }
    );
    mongoose.set("debug", true);
  }
}

module.exports = new Mongo();
