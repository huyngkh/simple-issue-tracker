import React, { useState, useEffect } from 'react';
import { ButtonToolbar, Button, Accordion, Form, Col, Row, Card } from 'react-bootstrap';
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
    <Card className="my-2">
      <Form controlId="frmIssue" className="m-4" onSubmit={handleClick}>
        <Form.Group as={Row} controlId="txtTitle">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext placeholder="Enter Issue title" value={title} onChange={e => setTitle(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="txtDescription">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" placeholder="Enter the issue description here" value={description} onChange={e => setDescription(e.target.value)} />
          </Col>
        </Form.Group>
        <Button controlId="btnNew" variant="primary" type="submit">
          Open Issue
      </Button>
      </Form>
    </Card>
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
      <h1 className="text-center">SIMPLE ISSUE TRACKER</h1>

      <div className="row my-2">
        <div className="col text-left">
          {false &&
            (<ButtonToolbar >
              <Button variant="success" size="sm">+ New</Button>
            </ButtonToolbar>)
          }
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Accordion defaultActiveKey="0">
            {issues && issues.map((issue, index) => (
              <IssueItem
                issue={issue}
                key={index}
                changeIssueState={changeIssueState}
              />
            ))}
          </Accordion>
        </div>
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
