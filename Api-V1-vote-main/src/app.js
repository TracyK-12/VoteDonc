const express = require('express');
const cors = require('cors'); // import cors
const { initDb } = require('./models/db');
const membersRoutes = require('./routes/members');

async function startServer() {
  await initDb();

  const app = express();

  app.use(cors()); //  active cors avant les routes
  app.use(express.json());

  // Routes
  app.use('/api/v1/members', membersRoutes);

  // Route de test
  app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }));

  const PORT = process.env.API_PORT || 3000;
  app.listen(PORT, () => console.log(`API v1 listening on port ${PORT}`));
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
