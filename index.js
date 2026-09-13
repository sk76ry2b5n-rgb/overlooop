const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const aiController = require('./src/controllers/aiController');
const sheetsController = require('./src/controllers/sheetsController');
const socialMediaController = require('./src/controllers/socialMediaController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/generate-caption', aiController.generateCaption);
app.post('/api/generate-content', aiController.generateContent);
app.post('/api/analyze-text', aiController.analyzeText);

// Sheets Integration
app.post('/api/sheets/append', sheetsController.appendToSheet);
app.get('/api/sheets/read', sheetsController.readSheet);
app.post('/api/sheets/update', sheetsController.updateSheet);

// Social Media Integration
app.post('/api/social/post', socialMediaController.createPost);
app.post('/api/social/schedule', socialMediaController.schedulePost);
app.get('/api/social/analytics', socialMediaController.getAnalytics);

// Power Automate Webhook
app.post('/api/webhook/power-automate', async (req, res) => {
  try {
    const { action, data } = req.body;
    
    if (action === 'generate') {
      const result = await aiController.generateCaption(null, { body: data });
      res.json({ success: true, result });
    } else if (action === 'post') {
      const result = await socialMediaController.createPost(null, { body: data });
      res.json({ success: true, result });
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'overlooop is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 overlooop server running on port ${PORT}`);
});
