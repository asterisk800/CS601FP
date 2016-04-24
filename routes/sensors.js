var express = require('express');
var router = express.Router();
var session = require('express-session');
var dateFormat = require('dateformat');
var now = new Date();

var Camera = require('../models/camera');
var Sensor = require('../models/sensor');

router.post('/add_camera', function(req, res){
    var newCamera = new Sensor({
        "camera.name":req.body.name,
        "camera.location": req.body.location,
        "camera.description": req._body.description
    });
    Sensor.createSensor(newCamera, function(err, sensor){
    if(err) throw err;
    console.log(sensor);
    });
    res.redirect('/camera');
});


module.exports = router;