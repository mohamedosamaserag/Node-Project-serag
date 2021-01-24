const express = require('express');

const {
  create,
  login,
  getAll,
  editOne,
  addFollow,
  unFollow,
} = require('../controllers/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.patch('/:_id', async (req, res, next) => {
  const {
    params: { _id },
    body,
  } = req;
  try {
    const users = await editOne(_id, body);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post('/follow/:fid', async (req, res, next) => {
  const {
    params: { fid },
    user: { id },
  } = req;
  try {
    const userFollowID = await addFollow(id, fid);
    res.json(userFollowID);
  } catch (e) {
    next(e);
  }
});

router.post('/unFollow/:fid', async (req, res, next) => {
  const {
    params: { fid },
    user: { id },
  } = req;
  try {
    const userUnFollowID = await unFollow(id, fid);
    res.json(userUnFollowID);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
