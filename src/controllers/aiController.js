const axios = require('axios');
const { callOllama } = require('../services/ollamaService');

const generateCaption = async (req, res) => {
  try {
    const { topic, tone, platform, hashtags } = req.body;

    const prompt = `Generate a ${tone} social media caption for ${platform} about ${topic}. ${hashtags ? 'Include hashtags: ' + hashtags : ''}`;

    const result = await callOllama(prompt);

    res.json({
      success: true,
      caption: result,
      platform,
      topic
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateContent = async (req, res) => {
  try {
    const { contentType, keywords, length } = req.body;

    const prompt = `Generate ${contentType} content about ${keywords}. Keep it ${length || 'medium'} length.`;

    const result = await callOllama(prompt);

    res.json({
      success: true,
      content: result,
      contentType
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `Analyze this text and provide: sentiment, key themes, and recommended hashtags. Text: ${text}`;

    const result = await callOllama(prompt);

    res.json({
      success: true,
      analysis: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateCaption,
  generateContent,
  analyzeText
};
