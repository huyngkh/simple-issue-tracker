const issueService = require('./issue-service');
const { genericHandle } = require('../generic-controller');

module.exports.getAllIssues = (req, res, next) => {
  genericHandle(req, res, next, () => issueService.getAllIssues());
};

module.exports.createIssue = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    // return bad request httpCode
    genericHandle(req, res, next, () => { return new Promise(resolve => resolve({})) }, 400);
  } else {
    genericHandle(req, res, next, () => issueService.createIssue(req.body));
  }
};
