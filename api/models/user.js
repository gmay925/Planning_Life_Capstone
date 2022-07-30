const { default: mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    require: true,
  },
  birthday: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Users', UserSchema);