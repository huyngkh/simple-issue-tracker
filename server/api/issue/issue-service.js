const jsonProvider = require('../../db/json-provider');
const { DB_NAME } = require('../constant');

module.exports.getAllIssues = async (params) => {
  return await jsonProvider.getAll(DB_NAME);
};