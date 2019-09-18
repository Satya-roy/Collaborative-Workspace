//jshint esversion:6

const express = require("express"),
      bodyParser = require("body-parser"),
      ejs = require("ejs"),
      mongoose = require("mongoose"),
      _ = require("lodash"),
      session = require("express-session"),
      passport = require("passport"),
      passportLocalMongoose = require("passport-local-mongoose");


//------------------------------------------------------------------------------
//Models
const org = require("./models/organisation.js"),
      memberSchema = require("./models/member.js"),
      list = require("./models/list.js");
const member = mongoose.model("member",memberSchema);
//------------------------------------------------------------------------------

//______________________________________________________________________________
//Routes
const orgRoutes = require("./routes/admin.js"),
      indexRoutes = require("./routes/index.js");
      registerRoutes = require("./routes/register.js");
      loginRoutes = require("./routes/login.js");
      listRoutes = require("./routes/list.js");
//______________________________________________________________________________


const app = express();

//______________________________________________________________________________
//chat server
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var users=[];
var connections = [];


//______________________________________________________________________________

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//add sessions
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized:false
}));

//initialize passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(member.createStrategy());
passport.serializeUser(member.serializeUser());
passport.deserializeUser(member.deserializeUser());

//connection
mongoose.connect("mongodb://localhost:27017/organisationDB",{useNewUrlParser:true});
mongoose.set("useCreateIndex",true);

//------------------------------------------------------------------------------
//Use Routes
app.use(orgRoutes);
app.use(indexRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(listRoutes);
//------------------------------------------------------------------------------



app.get("/home/:organisation/:username",function(req,res){
  const org = req.params.organisation;
  const user = req.params.username;
  console.log(org);
  if(req.isAuthenticated()){
    res.render("home",{name:org,user:user});
  }else{
    res.redirect("/login");
  }
});


app.get("/list/:org/:user",function(req,res){

  const user = req.params.user;
  const org_name = req.params.org;
  //console.log(user+" "+org_name);
  member.findOne({username:user},function(err,foundUser){
         res.render("toDoList",{org:org_name,user:foundUser});
      });

});


app.post("/orgPage/:org_name",function(req,res){
  const org_name = req.params.org_name;
  org.findOne({name:org_name},function(err,foundOrg){

    res.render("org",{org:foundOrg});
  });
});


//==============================================================================

app.post("/upload/:org/:user",function(req,res){
  const org_name = req.params.org;
  const user = req.params.user;
  res.render("upload",{org:org_name,user:user});
});

app.get("/upload",function(req,res){
  console.log("MF");
});


//==============================================================================
//Server for chat

server.listen(process.env.PORT || 8080);
console.log("Chat Server");

app.get("/chatRoom/:org/:user",function(req,res){
  const org_name = req.params.org;
  const user = req.params.user;
  res.render("chat",{name:org_name,user:user});
});

io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log("Connected "+connections.length);

  socket.on('disconnect',function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log("disconnected "+connections.length);
  });

  socket.on('send message',function(data){
    console.log(data);

    io.sockets.emit('new message',{msg:data.$msgSend,usr:data.$userSend});
  });
});
//==============================================================================
app.listen(3000,function(){
  console.log("Server is Working");
});
