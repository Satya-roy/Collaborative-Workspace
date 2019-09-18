//jshint esversion:6
const express = require("express");
const router = express.Router();
const org = require("../models/organisation.js");
const memberSchema = require("../models/member.js"),
listSchema = require("../models/list.js"),
mongoose = require("mongoose"),
_ = require("lodash"),
session = require("express-session"),
passport = require("passport"),
passportLocalMongoose = require("passport-local-mongoose");
const app = express();

const member = mongoose.model("member",memberSchema);

const list = mongoose.model("item",listSchema);

const item1 = new list({
  item : "Welcome to your todolist"
});

router.post("/list",function(req,res){
  const org_name = req.body.org_name;
  const user = req.body.user;


  member.findOne({username:user},function(err,foundUser){
        if(foundUser.list.length===0){
          foundUser.list.push(item1);
          foundUser.save(function(err,data){
            if(err){
              console.log(err);
            }
          });
        }

        res.render("toDoList",{org:org_name,user:foundUser});

   });
});

router.post("/addTask",function(req,res){
  const doNext = req.body.doNext;
  const user = req.body.user;
  const org_name = req.body.org;
  console.log(user);
  const newItem = new list({
    item : doNext
  });

  member.findOne({username:user},function(err,foundUser){
    foundUser.list.push(newItem);
    foundUser.save(function(err){
      if(err){
        console.log(err);
      }
    });
    res.redirect("/list/"+org_name+"/"+user);
  });
});

router.post("/listDelete",function(req,res){
  const itemId = req.body.checkbox;
  const user = req.body.user;
  const org = req.body.org;



  list.findByIdAndDelete(itemId,function(err){
    if(!err){
      console.log("Successfully Deleted the item.");
      res.redirect("/list/"+org+"/"+user);
    }
  });

});

module.exports = router;
