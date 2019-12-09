import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueItem from './IssueItem';

function CreateIssue({ openIssue }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = e => {
    e.preventDefault();
    if (!title || !description) return;

    // create a new issue or update the selected issue
    openIssue(title, description);

    // reset the controls
    setTitle("");
    setDescription("")
  };

  return (
    <form id="frmIssue" onSubmit={handleClick}>
      <input
        id="txtTitle"
        type="text"
        className="input"
        value={title}
        placeholder="Issue title"
        onChange={e => setTitle(e.target.value)}
      />
      <input
        id="txtDescription"
        type="textarea"
        className="input"
        value={description}
        placeholder="Enter the issue description here"
        onChange={e => setDescription(e.target.value)}
      />
      <button
        id="btnNew"
        type="submit"
        value="Open Issue"
      />
    </form>
  );
}

function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/api/issue/all');
      const { data } = result.data;
      setIssues(data);
    };
    fetchData();
  });

  const openIssue = (title, description) => {
    const fetchData = async () => {
      const result = await axios.post('http://localhost:3000/api/issue/', { title, description });
      const { data: newObj } = result.data;
      setIssues([...issues, newObj]);
    };
    fetchData();
  }

  const changeIssueState = (issue) => {
    const fetchData = async () => {
      const result = await axios.put(`http://localhost:3000/api/issue/${issue.id}`);
      const { data } = result.data;

      // update local state
      const newIssues = [...issues];
      let obj = newIssues.find(is => is.id === issue.id);
      obj.state = data.state;
      setIssues(newIssues);
    };
    fetchData();
  }

  return (
    <div className="container">
      <div className="header">SIMPLE ISSUE TRACKER</div>
      <div className="list-view">
        {issues && issues.map((issue, index) => (
          <IssueItem
            issue={issue}
            key={index}
            changeIssueState={changeIssueState}
          />
        ))}
      </div>
      <div className="open-issue" >
        {
          <CreateIssue openIssue={openIssue} />
        }
      </div>
    </div>
  );
}

export default IssueList;
