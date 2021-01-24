const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/user');

const create = (user) => User.create(user);

const login = async ({ userName, password }) => {
  const user = await User.findOne({ userName }).exec();

  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }

  const isVaildPass = user.validatePassword(password);
  console.log(isVaildPass);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }

  const token = await asyncSign(
    {
      username: user.username,
      id: user.id,
    },
    'SECRET_MUST_BE_COMPLEX',
    { expiresIn: '1d' }
  );
  return { ...user.toJSON(), token };
};

const getAll = () => User.find({}).exec();

const editOne = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true }).exec();

const addFollow = (id, targetId) =>
  User.update(
    { _id: id },
    {
      $push: {
        fowlling: targetId,
      },
    }
  );

const unFollow = (id, targetId) =>
  User.update(
    { _id: id },
    {
      $pull: {
        fowlling: targetId,
      },
    }
  );

module.exports = {
  create,
  login,
  getAll,
  editOne,
  addFollow,
  unFollow,
};
