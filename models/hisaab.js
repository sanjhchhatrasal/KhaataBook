const mongoose = require("mongoose");

const hisaabSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    passcode: {
        type: String,
        default: ""
    },
    isEncrypted: {
        type: Boolean,
        default: false
    },
    isEditable: {
        type: Boolean,
        default: true
    },
    shareable: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


module.exports = mongoose.model("hisaab", hisaabSchema)