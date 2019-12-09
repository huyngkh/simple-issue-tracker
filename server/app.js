const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./api');

app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  res.json({ message: 'Server is alive'});
});
apiRouter(app);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

