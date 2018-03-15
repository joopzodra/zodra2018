const express = require('express');
const path = require('path');

const app = express();
const filePath = path.join(__dirname, 'public');

app.use(express.static(filePath));

app.get(/.+/, (req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500);
  res.send("Er is een probleem met de server");
});

app.listen(8080, function() {
  console.log('Zodra app started on port 8080');
});
