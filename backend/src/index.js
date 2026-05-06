const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
  <html><head><title>Finance SaaS</title><meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
  body{font-family:Inter,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align
  -items:center;justify-content:center;margin:0}
  .glass{background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid
  rgba(255,255,255,0.2);border-radius:20px;padding:40px;color:white;max-width:500px;width:90%}
  h1{font-size:2.5rem;margin-bottom:10px}
  p{opacity:0.9;margin-bottom:20px}
  .card{background:rgba(255,255,255,0.1);padding:20px;border-radius:12px;margin:10px 0}
  </style></head><body>
  <div class="glass"><h1>💰 Finance SaaS</h1><p>Your finance dashboard is live.</p>
  <div class="card"><div style="font-size:2rem">$12,450.00</div><div style="font-size:0.8rem;opacity:0.8">Total
  Balance</div></div>
  <div class="card"><div style="font-size:2rem">✓ Live</div><div style="font-size:0.8rem;opacity:0.8">Backend
  Connected</div></div>
  </div></body></html>`);
  });

  app.get('/health', (req, res) => res.json({status:'ok'}));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log('Running on ' + PORT));
