const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_DB_URI}/khaatabookPractice`)

const db = mongoose.connection;

db.once("open", function(){
    console.log("Connected to db")
});

module.exports = db;