const mongoose = require('mongoose');
const user = require('./user');
const { Schema } = mongoose;

const article = new Schema({
  title: {
    type: String,
    maxLength: 130,
    required: true,
  },
  body: {
    type: String,
    maxLength: 4000,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updateAt: Date,
  auther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  tag: [String],
});

const articleModel = mongoose.model('article', article);
module.exports = articleModel;
