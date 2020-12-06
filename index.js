const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ test: "It's working" });
});

app.listen('3000');
