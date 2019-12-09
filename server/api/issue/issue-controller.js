const issueService = require('./issue-service');
const { genericHandle } = require('../generic-controller');

module.exports.getAllIssues = (req, res, next) => {
  genericHandle(req, res, next, () => issueService.getAllIssues(req.query));
};
