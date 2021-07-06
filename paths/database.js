const  express  = require("express")
const sql=require("mysql")
const encrypt=require("bcryptjs")

const db=sql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:"",
    database:process.env.DATABASE
})

db.connect((error)=>{
if (error){
    console.log(error)
}
else{
    console.log("mysql connected...")
}
})





 function register (req,res){
    
    const { user, password, cpassword, domain, email}=req.body
    const users="users"
    const query="INSERT INTO "+ users +" set ?"
    console.log(req.body)
  
 
   
    
    if( user.length < 4) {
          
        return res.render("index",{mess:"user length mustbe between 4 to 16 "})
 }
    else if( user.length > 16){
        return res.render("index",{mess:"user length mustbe between 4 to 16 "})

     }
 
    
    if(password !==cpassword){
        return res.render("index",{mess:"password does not match "})

    }
    
   
       
    db.query("SELECT email,name  FROM users  WHERE email = ? OR name = ?",[email,user],async(error,result)=>{
        console.log(result)
        if(error){  
            console.log(error)
        }
        if (result.length >0){
            return res.render("index",{ mess:"email or user alredy exist"})

        }
        let hashpassword=await encrypt.hash(password,8)
        db.query( query,{name:user,password:hashpassword,domain:domain,email:email},(error,result)=>{
           
            if(error){  
                console.log(error)
            }
            else{
                return res.render("index",{ mess:"user registered"})
            }


        
            
            });
           
           
        });
        
   


    
}
function login(req,res){
    const db=sql.createConnection({
        host:process.env.HOST,
        user:process.env.USER,
        password:"",
        database:process.env.DATABASE
    })
    
    db.connect((error)=>{
    if (error){
        console.log(error)
    }
    else{
        console.log("mysql connected...")
    }
    })
    const { luser, lpass}=req.body
    
    db.query("SELECT * FROM users WHERE name=?",[luser],async(error,result)=>{
        if (result.length==0){
            res.render("index",{mess:"invalid user"})
        }
        else if(!(await encrypt.compare(lpass,result[0].password))){
            res.render("index", {mess:"invalid password"})
        }
        else{
            console.log(result)
            
            res.render("page",{name:result[0].name,email:result[0].email,domain:result[0].domain})
            
        }


    
    })
    

   
}
module.exports={register,login}
