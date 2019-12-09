const jsonProvider = require('../../db/json-provider');
const { DB_NAME, ISSUE_STATE } = require('../constant');

const changeIssueState = (issue) => {
  const updatedIssue = { ...issue };

  switch (updatedIssue.state) {
    case "open":
      updatedIssue.state = "pending";
      break;
    case "pending":
      updatedIssue.state = "closed";
      break;
    case "closed":
      // do nothing if the issue is closed
      break;
    default:
      updatedIssue.state = "error";
      break;
  }

  return updatedIssue;
}

module.exports.getAllIssues = async () => {
  return await jsonProvider.getAll(DB_NAME);
};

module.exports.createIssue = async (jsonObject) => {
  jsonObject.state = ISSUE_STATE.OPEN;

  return await jsonProvider.insert(DB_NAME, jsonObject);
};

module.exports.changeState = async (id) => {
  return await jsonProvider.getAll(DB_NAME).then((data) => {
    const searchObj = data.find(el => el.id === parseInt(id, 10));

    if (!searchObj) {
      return new Promise((resolve) => {
        resolve({ errorCode: 1, errorMessage: 'Issue not found' });
      });
    }

    const updatedObj = changeIssueState(searchObj);
    return jsonProvider.update(DB_NAME, updatedObj);
  });
};
