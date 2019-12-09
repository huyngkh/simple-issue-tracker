const request = require('supertest');
const { ISSUE_STATE } = require('../api/constant');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('../api');

app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  res.json({ message: 'Server is alive' });
});
apiRouter(app);

describe('Issue API /api/issue', () => {
  it('Get all of the issues GET /api/issue/all', async () => {
    const res = await request(app)
      .get('/api/issue/all');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).not.toHaveLength(0);
  });

  describe('Create a new issue POST /api/issue/', () => {
    it('should have both title and descrpition valid', async () => {
      const res = await request(app)
        .post('/api/issue/')
        .send({
          title: 'Closed issues are able to change back to open',
          description: 'It is possilbe to set closed issues back to open when calling api directly.'
        }
        );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
    });

    it('should have title or descrpition not null', async () => {
      const res = await request(app)
        .post('/api/issue/')
        .send({
          title: null,
          description: null
        }
        );
      expect(res.statusCode).toEqual(400);
    });

    it('should have title or descrpition not undefined', async () => {
      const res = await request(app)
        .post('/api/issue/')
        .send({});
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('Change issue state PUT /api/issue/:id', () => {
    it('Should change the state from open to pending', async () => {
      const res = await request(app)
        .get('/api/issue/all');
      // find an open issue
      const openIssue = res.body.data.find(el => el.state === ISSUE_STATE.OPEN);

      // start testing on the open Issue
      const res2 = await request(app)
        .put(`/api/issue/${openIssue.id}`);
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('data');
      expect(res2.body.data).toHaveProperty('state');
      expect(res2.body.data.state).toEqual(ISSUE_STATE.PENDING);
    });

    it('Should change the state from pending to closed', async () => {
      const res = await request(app)
        .get('/api/issue/all');
      // find an open issue
      const openIssue = res.body.data.find(el => el.state === ISSUE_STATE.PENDING);

      // start testing on the open Issue
      const res2 = await request(app)
        .put(`/api/issue/${openIssue.id}`);
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('data');
      expect(res2.body.data).toHaveProperty('state');
      expect(res2.body.data.state).toEqual(ISSUE_STATE.CLOSED);
    });

    it('Should not change the closed issue\'s state', async () => {
      const res = await request(app)
        .get('/api/issue/all');
      // find an open issue
      const openIssue = res.body.data.find(el => el.state === ISSUE_STATE.CLOSED);

      // start testing on the open Issue
      const res2 = await request(app)
        .put(`/api/issue/${openIssue.id}`);
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('data');
      expect(res2.body.data).toHaveProperty('state');
      expect(res2.body.data.state).toEqual(ISSUE_STATE.CLOSED);
    });
  });
})
