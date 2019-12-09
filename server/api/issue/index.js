const express = require('express');
const router = express.Router();
const controller = require('./issue-controller');

router.get('/all', controller.getAllIssues);
router.post('/', controller.createIssue);
router.put('/:id', controller.changeState);

module.exports = router;
