const express = require('express');
const app = express();
const port = 3001; // Choose a port different from Next.js

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`[SERVER]: Server listening at http://localhost:${port}`);
});