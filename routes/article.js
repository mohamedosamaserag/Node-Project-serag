const express = require('express');
const rout = express.Router();

// const authMW = require('../middleware/auth');

const {
  create,
  getAll,
  searchById,
  editArticle,
  deleteById,
  searchByTitle,
  searchByTag,
  searchauther,
} = require('../controllers/article');

rout.get('/', async (req, res, next) => {
  try {
    const articles = await getAll();
    res.json(articles);
  } catch (e) {
    next(e);
  }
});

rout.get('/:_id', async (req, res, next) => {
  const {
    params: { _id },
  } = req;
  try {
    const article = await searchById({ _id });
    res.json(article);
  } catch (e) {
    next(e);
  }
});

rout.get('/title/:title', async (req, res, next) => {
  const {
    params: { title },
  } = req;
  try {
    const article = await searchByTitle({ title });
    res.json(article);
  } catch (e) {
    next(e);
  }
});

rout.get('/tag/:tag', async (req, res, next) => {
  const {
    params: { tag },
  } = req;
  try {
    const article = await searchByTag({ tag });
    res.json(article);
  } catch (e) {
    next(e);
  }
});

// rout.use(authMW);
rout.post('/add/', async (req, res, next) => {
  const { body } = req;
  try {
    const article = await create({ ...body });
    res.json(article);
    res.send('Added');
  } catch (e) {
    next(e);
  }
});

rout.patch('/:_id', async (req, res, next) => {
  const {
    params: { _id },
    body,
  } = req;
  try {
    const articles = await editArticle({ _id }, body);
    res.json(articles);
  } catch (e) {
    next(e);
  }
});

rout.delete('/:_id', async (req, res, next) => {
  const {
    params: { _id },
  } = req;
  try {
    const article = await deleteById({ _id });
    res.send('Delete Done');
  } catch (e) {
    next(e);
  }
});

rout.get('/auther/:auther', async (req, res, next) => {
  const {
    params: { auther },
  } = req;
  try {
    const blogs = await searchauther({ auther });
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

module.exports = rout;
