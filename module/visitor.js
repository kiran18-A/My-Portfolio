const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const visitor_Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});
const visitor= mongoose.model("visitor", visitor_Schema);
module.exports = visitor;