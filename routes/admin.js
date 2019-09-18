//jshint esversion:6
//admin
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const org = require("../models/organisation.js");
const memberSchema = require("../models/member.js");
const member = mongoose.model("member",memberSchema);
const fs = require('fs');
const path = require('path');
const folder = require("../folders/createdir.js");

const org1 = new org({
  name: "Organisation1"
});

const org2 = new org({
  name: "Organisation2"
});

const defaultOrgs =[org1,org2];

router.get("/admin",function(req,res){
  org.find({},function(err,orgs){
    if(err){
      console.log(err);
    }
    else{
      if(orgs.length===0){
        org.insertMany(defaultOrgs,function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Succesfull added default Organisation");
          }
        });
      }

      res.render("admin",{org:orgs});
    }
  });
});
//new Organisation
router.post("/newOrg",function(req,res){
  const newOrg = new org({
    name:req.body.name
  });
var dname = "/home/s_s_sroy/Desktop/Project/folders/";
var mkdir = folder(dname,newOrg.name);
//console.log(__dirname);
  newOrg.save(function(err){
    if(!err){
      res.redirect("/admin");
    }
  });
  console.log("New Student Added");
});
//delete an organisation
router.post("/admin_delete",function(req,res){
  const cross = req.body.cross;

  org.findByIdAndDelete(cross,function(err){
    if(!err){
      console.log("Successfully deleted the Organisation.");
      res.redirect("/admin");
    }
  });
});

module.exports = router;
