const express = require('express');
const article = require('./article');
const users = require('./user');
const authMW = require('../middleware/auth');

const router = express.Router();

router.use('/user', users);
router.use('/article', article);

module.exports = {
  router,
};
