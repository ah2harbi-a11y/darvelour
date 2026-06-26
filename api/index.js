// Vercel serverless entry point. Every /api/* (and /uploads/*) request is routed
// here by vercel.json; the Express app matches on the original URL.
module.exports = require('../server/app');
