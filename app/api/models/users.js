const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


//db Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name : {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type:String,
		trim: true,
		required: true
	}
});

//hash passwords before storing
UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User', UserSchema)