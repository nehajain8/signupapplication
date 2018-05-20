var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeauth');
var db  = mongoose.connection;
var UserSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required: true,
    }
});
var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser= function(newUser,callback){
    newUser.save(callback);
}
