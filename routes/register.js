//to join a oganisation
//jshint esversion:6
const express = require("express");
const router = express.Router();
const org = require("../models/organisation.js");
const memberSchema = require("../models/member.js"),
mongoose = require("mongoose"),
_ = require("lodash"),
session = require("express-session"),
passport = require("passport"),
passportLocalMongoose = require("passport-local-mongoose");
const member = mongoose.model("member",memberSchema);
router.post("/join_org",function(req,res){
  const join_org = req.body.join_org;
  //console.log(join_org);
  org.findById(join_org,function(err,orgs){
    if(!err){
      res.render("register",{org:orgs});
    }
  });
});


//to Register
router.post("/register",function(req,res){
  const member_detail = req.body;


  const newMember = new member({
    username : member_detail.username
    });
    //password : member_detail.password
    member.register(newMember,req.body.password,function(err,user){
      if(err){
        console.log(err);
        //res.render("register");
      }
      passport.authenticate("local")(req,res,function(){

          org.findById(member_detail.org_id,function(err,foundOrg){
            if(err){
              console.log(err);
            }
            else{
              foundOrg.members.push(newMember);
              foundOrg.save(function(err,data){
                if(err){
                  console.log(err);
                }else{
                  //console.log("/home"+foundOrg);
                    res.redirect("/home/"+foundOrg.name+"/"+newMember.username);
                }
              });
            }
          });
      });
  });
});

module.exports = router;
