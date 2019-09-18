//Schema Organisation
//jshint esversion:6
const mongoose = require("mongoose");
const memberSchema = require("./member.js");

const member = mongoose.model("member",memberSchema);

const orgSchema = new mongoose.Schema({
  name : String,
  password: String,
  members:[
    {
      // type: mongoose.Schema.Types.ObjectId,
      // ref:"member"
      memberSchema

    }
  ]
});


const Org = mongoose.model("org",orgSchema);
module.exports = Org;
