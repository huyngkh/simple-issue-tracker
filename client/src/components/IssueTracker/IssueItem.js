import React from 'react';
import { Card, Accordion, Badge, Button } from 'react-bootstrap';
import { ISSUE_STATE } from './constant';

const stateColor = (state) => {
  switch (state) {
    case ISSUE_STATE.OPEN:
      return 'primary';
    case ISSUE_STATE.PENDING:
      return 'success';
    case ISSUE_STATE.CLOSED:
      return 'secondary';
    default:
      return 'warning';
  }
};

const changeStateButtonText = (state) => {
  switch (state) {
    case ISSUE_STATE.OPEN:
      return 'Process';
    case ISSUE_STATE.PENDING:
      return 'Complete';
    default:
      return '';
  }
};

function IssueItem({ issue, changeIssueState }) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={issue.id}>
        <Badge pill variant={stateColor(issue.state)}>
          {issue.state}
        </Badge>
        {' '}
        {issue.title}
        {
          issue.state !== ISSUE_STATE.CLOSED && (
            <Button
              onClick={() => changeIssueState(issue)}
              variant={issue.state === ISSUE_STATE.OPEN ? "outline-primary" : "outline-success"}
              className="float-right">
              {changeStateButtonText(issue.state)}
            </Button>
          )
        }
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={issue.id}>
        <Card.Body>
          {issue.description}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default IssueItem;
