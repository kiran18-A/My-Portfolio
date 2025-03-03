const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const message_Schema = new mongoose.Schema({
    Name:{
        type: String
    },
    Email:{
        type: String
    },
    message:{
        type: String
    },
    Date:{
        type: Date
    }
});
const message= mongoose.model("message", message_Schema);
module.exports = message;