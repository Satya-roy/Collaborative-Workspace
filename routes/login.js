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
const app = express();


router.post("/login_org",function(req,res){
  const login_org = req.body.login_org;
  //console.log(join_org);
  org.findById(login_org,function(err,orgs){
    if(!err){
      res.render("login",{org:orgs});
    }
  });
});

router.post("/login",function(req,res){
  var x=false;
  org.findById(req.body.org_id,function(err,foundOrg){
    if(err){
      return res.send("Fisrt register");
    }
    else{

      foundOrg.members.forEach(function(element){

          member.findById(element,function(err,foundMember){
            if(foundMember.username===req.body.username){

              x = true;
              console.log(x+"#");

              if(x){
                const checkMember = new member({
                  username : req.body.username,
                  password : req.body.password
                });

                req.login(checkMember, function(err){
                  if(err){
                    console.log(err);
                  } else{
                    console.log(foundOrg.name);
                     res.redirect("/home/"+foundOrg.name+"/"+foundMember.username);
                  }
                });
              }


            }
            else{
              res.send("register to do");
            }
          });
        }
      );

    }
  });
  console.log(x);

});

module.exports = router;
