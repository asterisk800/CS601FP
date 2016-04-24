var mongoose = require('mongoose');

var CameraSchema = mongoose.Schema({
    name: String,
    location: String,
    description: String
});
var Camera = module.exports = mongoose.model('Camera', CameraSchema);

module.exports.createCamera = function(newCamera, callback) {
    newCamera.save(callback);
}

module.exports.getCameraByName = function(query, callback){
    Camera.findOne(query, callback);
}

module.exports.getCameraById = function(id, callback){
    Camera.findById(id, callback);
}

module.exports.getAllCamera = function(){
    Camera.find({}, function(err, doc){
        console.log(doc);
    });
}