const article = require('../models/articles');

const create = (articles) => article.create(articles);

const getAll = () => article.find({}).exec();

const searchById = (id) => article.findById(id).exec();

const editArticle = (id, body) =>
  article.findByIdAndUpdate(id, body, { new: true }).exec();

const deleteById = (id) => article.findByIdAndDelete(id).exec();

const searchByTitle = ({ title }) => article.find({ title }).exec();

const searchByTag = ({ tag }) => article.find({ tag }).exec();

const searchauther = ({ auther }) => article.find({ auther }).exec();
module.exports = {
  create,
  getAll,
  searchById,
  editArticle,
  deleteById,
  searchByTitle,
  searchByTag,
  searchauther,
};
