const express = require('express');                                                                                       const path = require('path');
  const app = express();

  app.use(express.static('public'));

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log('Running on ' + PORT));
