const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const project_Schema = new mongoose.Schema({
    Name:{
        type: String
    },
    Descripion:{
        type: String
    },
    Link:{
        type: String
    }
});
const project= mongoose.model("project", project_Schema);
module.exports = project;