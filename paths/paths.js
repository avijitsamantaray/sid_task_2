const express=require("express")
const path=express.Router()
const controll=require("./database")

path.get("/",(req,res)=>{
    res.render("index",{mess:"a"})
});

    


path.get("/detail",(req,res)=>{
    res.render("profile")
});

path.post("/registered",controll.register)
path.post("/login",controll.login)
module.exports=path
