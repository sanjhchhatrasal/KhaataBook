const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    hisaab: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "hisaab"
        }
    ]
})

module.exports = mongoose.model("user", userSchema)