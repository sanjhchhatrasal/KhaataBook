const mongoose = require("mongoose");

try{
    mongoose.connect(`${process.env.MONGO_DB_URI}`)

const db = mongoose.connection;

db.once("open", function(){
    console.log("Connected to db")
});

module.exports = db;
} catch(error){
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); 
}