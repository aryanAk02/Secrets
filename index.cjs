
const axios=require("axios");
const bodyParser=require("body-parser");
const express=require("express");

const app=express();

app.listen(3000,function(){
    console.log("server started listening on port 3000");
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.get("/",async(req,res)=>{
    try{
        const result=await axios.get("https://secrets-api.appbrewery.com/random");
        console.log(result.data);
        res.render("index.ejs",{secret:result.data.secret,user:result.data.username});
    }catch(error){
        res.status(404).send(error.response.data);
    }
  
});