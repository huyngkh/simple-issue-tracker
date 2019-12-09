const issue = require('./issue');

module.exports = (app) => {
  app.use('/api/issue', issue);
};
