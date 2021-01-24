const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const user = Schema(
  {
    Name: {
      type: String,
      maxLength: 150,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      maxLength: 150,
      required: true,
    },
    password: {
      type: String,
      minLength: 7,
      maxLength: 140,
      required: true,
    },

    dob: Date,
    Follower: [{ type: Schema.ObjectId, ref: 'users' }],
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

user.pre('save', function preSave(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

user.pre('findOneAndUpdate', function preSave(next) {
  if (!this._update.password) {
    return;
  }
  this._update.password = bcrypt.hashSync(this._update.password, 8);
  next();
});

user.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const users = mongoose.model('user', user);

module.exports = users;
