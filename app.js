const express=require("express")
const sql=require("mysql")
const dotenv=require("dotenv")
const path=require("path")
const port=8000
const app =express()
const public=path.join(__dirname,"./sources")


// configuration
dotenv.config({path:"./s.env"})
app.set("view engine","hbs")
app.use(express.static(public))
app.use(express.urlencoded())
app.use(express.json())

// redirect
app.use(require("./paths/paths"))
app.use("/auth",require("./paths/paths"))
app.post("/login",require("./paths/paths"))



// server start
app.listen(port,()=>{
    console.log("server started sucessfully")
});