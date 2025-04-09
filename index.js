require("dotenv").config();

const express= require("express");
const ejs=require("ejs");
const app= express();
const mongoose = require("mongoose");
const methodOverride= require("method-override");
const path= require("path");
const { title } = require("process");

app.set("view engine","ejs");
app.set("views",  path.join(__dirname, "/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '/Photos')));


const visitor= require("./module/visitor.js");
const password= require("./module/password.js");
const myname= require("./module/name.js");
const skill= require("./module/skill.js");
const project=require("./module/project.js");
const message=require("./module/message.js");

const dbURL = process.env.ATLAS_URL;

async function main(){
  await mongoose.connect(dbURL),{
    socketTimeoutMS: 70000 // Set timeout to 30 seconds
  };   
}


main().then( ()=>{
  console.log("mongo is working for login");
})
.catch((err) => console.log(err));
const port= process.env.PORT;
app.listen(port,()=> {
    console.log("listening on port "+port);
  });

app.get("/",async (res,req)=>{
  let id="67c49fd4aa85673d05859d6b";
  let pass=await password.findById(id);
  if(pass==null){
    req.render("setpass.ejs");
  }
  else{
    req.render("home.ejs");
  }
  });

app.post("/set_password",async (res,req)=>{
  let {pass,cpass}=res.body;
  let id="67c49fd4aa85673d05859d6b";
  if(pass==cpass){
    let chat1 = new password(
      {
        _id: "67c49fd4aa85673d05859d6b",
        password: pass
      }
    );
    chat1.save().then(res => {
    }).catch(err =>{
    console.log(err);
    });
    req.redirect("/");
  }
} );

app.post("/visitor",async (res,req)=>{
    let {nameofv}=res.body;
    let newnote = new visitor({
        name: nameofv
    });
    await newnote.save()
    .catch(err=>{console.log(err)});
    req.redirect("/home");
});

app.get("/home",async (res,req)=>{
  let id="67c49fd4aa85673d05859d6b";
  let visitors=await visitor.find();
  let names=await myname.findById(id);
  let skills=await skill.find();
  let projects=await  project.find();
  let count=0;
  for(let visitor of visitors){
    count=count+1;
  }
  console.log(names);
  req.render("info.ejs",{names,skills,count,projects});
  });

app.get("/password",async (res,req)=>{
    req.render("password.ejs");
});
app.post("/password",async(res,req)=>{
  let {epassword}= res.body;
  let id="67c49fd4aa85673d05859d6b";
  let pass=await password.findById(id);
  if(epassword==pass.password){
    req.redirect("/setting");
  }
});

app.get("/setting",async (res,req)=>{
  let id="67c49fd4aa85673d05859d6b";
  let names=await myname.findById(id);
  let skills=await skill.find();
  let messages=await message.find();
  let visitors=await visitor.find();
  let option="Programing Language";
  if(names==null){
    let newnote = new myname({
      _id: id,
      name: "Kiran Aglawe"
  });
  await newnote.save(); 
  }
  names=await myname.findById(id);
  req.render("setting.ejs",{names,option,skills,messages,visitors});
});

app.post("/setname",async (res,req)=>{
  let id="67c49fd4aa85673d05859d6b";
  let pass=await password.findById(id);
  let { name,epass }= res.body;

  if(pass.password==epass){
    let setname=await myname.findByIdAndUpdate(id,
      {name: name}
    );
    req.redirect("/home");
  }
});

app.post("/programinng",async (res,req)=>{
  let { language_name,language_persentage }= res.body;
  let name= "Programing Language";
    let newnote = new skill({
      skill_type: language_name,
        skill_name: name,
        persentage: language_persentage
  });
  await newnote.save();
    req.redirect("/home");
});

app.post("/web",async (res,req)=>{
  let { language_name,language_persentage }= res.body;
  let name= "Web Development";
  let newnote = new skill({
    skill_type: language_name,
      skill_name: name,
      persentage: language_persentage
  });
  await newnote.save();
  req.redirect("/home");
});

app.post("/database",async (res,req)=>{
  let { language_name,language_persentage }= res.body;
  let name= "Datebase";
  let newnote = new skill({
    skill_type: language_name,
      skill_name: name,
      persentage: language_persentage
  });
  await newnote.save();
  req.redirect("/home");
});

app.post("/language",async (res,req)=>{
  let { language_name,language_persentage }= res.body;
  let name= "language";
  let newnote = new skill({
    skill_type: language_name,
      skill_name: name,
      persentage: language_persentage
  });
  await newnote.save();
  req.redirect("/home");
});

app.post("/showinfo",async (res,req)=>{
  let {option}= res.body;
  let id="67160509bc22aabac46639de";
  let names=await myname.findById(id);
  let skills=await skill.find();
  req.render("setting.ejs",{names,option,skills});
});

app.post("/edit/:id",async (res,req)=>{
  let {persentage}= res.body;
  let {id}= res.params;
  let edit=await skill.findByIdAndUpdate(id,
    {persentage: persentage}
  );
  req.redirect("/home")
});

app.post("/remove/:id",async (res,req)=>{
  let {id}= res.params;
  await skill.findByIdAndDelete(id);
  req.redirect("/home");
});

app.post("/project",async (res,req)=>{
  let {name,Descripion,link}= res.body;
  console.log(name);
  let newnote = new project({
    Name: name,
    Descripion: Descripion,
    Link: link
  });
  await newnote.save();
  req.redirect("/home");
});

app.post("/message",async(res,req)=>{
  let {name,email,messages}= res.body;
  let date= new Date();
  let newnote = new message({
    Name: name,
    Email: email,
    message: messages,
    Date: date
  });
  await newnote.save();
});

app.post("/remove_visitor/:id",async (res,req)=>{
  let {id}= res.params;
  await visitor.findByIdAndDelete(id);
  req.redirect("/setting");
});

app.post("/remove_message/:id",async (res,req)=>{
  let {id}= res.params;
  await message.findByIdAndDelete(id);
  req.redirect("/setting");
});