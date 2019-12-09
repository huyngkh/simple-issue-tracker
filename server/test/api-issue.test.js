const request = require('supertest');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('../api');

app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  res.json({ message: 'Server is alive'});
});
apiRouter(app);

describe('Issue API /api/issue', () => {
  it('Should get all of the issues /api/issue/all', async () => {
    const res = await request(app)
      .get('/api/issue/all');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).not.toHaveLength(0);
  });
})
