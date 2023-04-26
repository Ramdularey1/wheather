const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
res.sendFile(__dirname+ "/index.html");

});

app.post("/",function(req,res){
   


    const query=req.body.cityname;
   const apikey="0e16c1a81f383f41cc3081eee0c94752";
   const unitess="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unitess;
    

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].main;
            const icon=weatherdata.weather[0].icon
            const urlimage="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather currently is " + weatherdescription + "</p>");
            res.write("<h1>The tempature in "+query+" is " + temp + " Degree Celsius </h1>");
            res.write("<img src="+urlimage+">");
            res.send();
        });
    });
})





app.listen(3000, function () {
    console.log("sever is running at port 3000");
})

