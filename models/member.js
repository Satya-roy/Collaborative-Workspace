//jshint esversion:6
//Schema member
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const listSchema = require("./list.js");

const list = mongoose.model("item",listSchema);

const memberSchema = new mongoose.Schema({
  username:String,
  password:String,
  list:[
    listSchema
  ]
});

//to hash and salt
memberSchema.plugin(passportLocalMongoose);

//const member = mongoose.model("member",memberSchema);
module.exports = memberSchema;
