const jsonProvider = require('../../db/json-provider');
const { DB_NAME, ISSUE_STATE } = require('../constant');

module.exports.getAllIssues = async () => {
  return await jsonProvider.getAll(DB_NAME);
};

module.exports.createIssue = async (jsonObject) => {
  jsonObject.state = ISSUE_STATE.OPEN;

  return await jsonProvider.insert(DB_NAME, jsonObject);
};
