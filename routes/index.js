//jshint esversion:6
//index
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const org = require("../models/organisation.js");
const memberSchema = require("../models/member.js");
const member = mongoose.model("member",memberSchema);
router.get("/",function(req,res){
  org.find({},function(err,orgs){
    if(err){
      console.log(err);
    }
    else{
      if(orgs.length==0){
        org.insertMany(defaultOrgs,function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Succesfull added default Organisation");
          }
        });
      }
      res.render("index",{org:orgs});
    }
  });
});

module.exports = router;
