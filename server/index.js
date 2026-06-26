// Local development / self-hosted entry point.
// On Vercel the app is served as a serverless function via /api/index.js instead.
const express = require('express');
const path = require('path');
const app = require('./app');

const PORT = process.env.PORT || 5001;

// Serve the built frontend when running the app as a standalone server (npm start).
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(buildPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Darvelour API running on http://localhost:${PORT}`);
});
