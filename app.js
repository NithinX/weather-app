const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.post('/',function(req,res){


    const baseUrl="https://api.openweathermap.org/data/2.5/weather";
    const apiKey="1789b1d2c3edd01161f4528f41fa6385";
    const query=req.body.city;
    const URL =baseUrl+"?q="+query+"&appid="+apiKey+"&units=metric";

    https.get(URL,function(response){
      response.on("data",function(data){
        const resdata= JSON.parse(data);
        if(resdata.cod == 200){
          const location= resdata.name;
          const temp = resdata.main.temp;
          const weatherDesc = resdata.weather[0].description;
          const logoID = resdata.weather[0].icon
          res.write("<h1> The Temperature in "+location+" is "+temp+" degrees Celcius.</h1>");
          res.write("<h3>Weather currently is "+weatherDesc+"</h3>");
          res.write("<img src='http://openweathermap.org/img/wn/"+logoID+"@2x.png' alt='weather-logo' >")
          res.send();
        } else{
          res.send("<h3>"+resdata.message+"</h3>")
        }    
      })
    });
})


app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000,function(){
    console.log("server started on port 3000");
})