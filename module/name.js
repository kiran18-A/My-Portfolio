const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const { name } = require("ejs");
const { text } = require("stream/consumers");
const myname_Schema = new mongoose.Schema({
    name:{
        type: String
    }
});
const myname= mongoose.model("myname", myname_Schema);
module.exports = myname;