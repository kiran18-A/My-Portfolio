const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const skill_Schema = new mongoose.Schema({
    skill_type:{
        type: String
    },
    skill_name:{
        type: String
    },
    persentage:{
        type: Number
    }
});
const skill= mongoose.model("skill", skill_Schema);
module.exports = skill;