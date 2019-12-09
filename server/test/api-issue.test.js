const request = require('supertest');
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

})
