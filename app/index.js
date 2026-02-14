/*
  Secure NodeJS Application with Prometheus Monitoring

  - Exposes application metrics at /metrics
  - Tracks total HTTP requests to root endpoint
  - Used for anomaly detection (e.g., DoS simulation)
*/

const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Create Prometheus registry
const register = new client.Registry();

// Add default label to all metrics
register.setDefaultLabels({
  app: 'secure_nodejs_app'
});

// Collect default NodeJS process metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Custom metric: count total requests to "/"
const rootRequestCounter = new client.Counter({
  name: 'http_requests_root_total',
  help: 'Total number of HTTP requests to root path'
});

// Register custom metric
register.registerMetric(rootRequestCounter);

// Middleware to increment counter
app.use((req, res, next) => {
  if (req.path === '/') {
    rootRequestCounter.inc();
  }
  next();
});

// Prometheus scraping endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Application endpoint
app.get('/', (req, res) => {
  res.send('Secure NodeJS App Running');
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

