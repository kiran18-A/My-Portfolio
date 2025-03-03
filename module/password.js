const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const password_Schema = new mongoose.Schema({
    password:{
        type: Number
    }
});
const password= mongoose.model("password", password_Schema);
module.exports = password;