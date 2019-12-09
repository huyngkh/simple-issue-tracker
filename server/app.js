var express = require("express");
var app = express();

app.get("/", (req, res, next) => {
  res.json([
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      state: "open"
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      state: "pending"
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 2",
      state: "closed"
    }
  ]);
 });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
