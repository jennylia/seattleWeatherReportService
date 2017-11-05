var express = require('express');
var app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
const apiKey = '3d86fd1c772eefd96c501522e55d2b98';


app.get('/', function (req, res) {
    let city = "seattle";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request(url, function (err, response, body) {
        if (err) {
            res.send({
                "Output": "Error"
            });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.send({
                    "Output": "Error"
                });
            } else {
                console.log(weather);
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.send({
                    "Output": weatherText
                });
            }
        }
    });
});

app.post('/', function (req, res) {
    res.send({
        "Output": "Hello World!"
    });
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
