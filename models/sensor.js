var mongoose = require('mongoose');

// Sensor Schema
var SensorSchema = mongoose.Schema({
        appliance: {name: String, location: String, description: String},
        camera: {name: String, location: String, description: String},
        lighting: {name: String, location: String, description: String},
        locks: {name: String, location: String, description: String},
        thermostat: {name: String, location: String, description: String}
});

var Sensor = module.exports = mongoose.model('Sensor', SensorSchema);

module.exports.createSensor = function(newSensor, callback) {
    newSensor.save(callback);
}

module.exports.getSensorByName = function(query, callback){
    Sensor.findOne(query, callback);
}

module.exports.getSensorById = function(id, callback){
    Sensor.findById(id, callback);
}

module.exports.getAllSensor = function(){
    Sensor.find({}, function(err, doc){
        console.log(doc);
    });
}