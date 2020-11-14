var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      trim: true,
      lowercase:true,
      required: "Username is Required"
    },

    password: {
      type: String,
      trim: true,
      required: "Password is Required",
      minlength: 5,
      maxlength: 255,
    },

    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 255,
      lowercase:true,
      required: true,
    }, 

    isAdmin: {
      type: Boolean,
      default: false,
    }

  },
  { timestamps: true });

  UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'myprivatekey'); 
    return token;
  }

const User = mongoose.model("User", UserSchema);

  // Export the User model
module.exports = User;