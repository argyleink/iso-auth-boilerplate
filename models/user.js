// load the things we need
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// define the schema for our user model
const userSchema = mongoose.Schema({
  groups: Array,
  isValidated: Boolean,
  loginToken: String,
  userLevel: Number,
  local: {
    email: String,
    password: String,
  },
});

// generating a hash
userSchema.methods.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);


// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
export default mongoose.model('User', userSchema);
