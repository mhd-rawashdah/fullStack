const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github');
const db = require('../database/index');
let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;

  db.getData(username, function (data) {
    if (data) {
      console.log("From DB")
      res.send(data.repos)
    } else {
      helpers.getReposByUsername(username, function (repos) {
        db.save({ username: username, repos: repos });
        console.log("From API")
        res.send(repos);
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getData(req.body.username, function (data) {
    res.sendStatus(200);
  });

});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

