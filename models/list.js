//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

const itemsSchema = new mongoose.Schema({
  item : String
});

//const Item = mongoose.model("item",itemsSchema);
module.exports = itemsSchema;
