import React from 'react';

function IssueItem({ issue, changeIssueState }) {
  return (
    <div>
      {issue.title}
      {issue.description}
      <button onClick={() => changeIssueState(issue)}>{issue.state}</button>
    </div>
  );
}

export default IssueItem;
