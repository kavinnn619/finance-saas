const express = require('express');
  const helmet = require('helmet');
  const cors = require('cors');

  const app = express();

  app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'self'"] } } }));
  app.use(cors({ origin: '*' }));
  app.use(express.json({ limit: '10kb' }));

  app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  app.get('/api/test', (req, res) => {
    res.json({ message: 'Finance SaaS API is running!' });
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Finance SaaS backend running on ${PORT}`);
  });
