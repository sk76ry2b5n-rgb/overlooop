const axios = require('axios');

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama2';

const callOllama = async (prompt, model = OLLAMA_MODEL) => {
  try {
    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model,
      prompt,
      stream: false
    });

    return response.data.response.trim();
  } catch (error) {
    console.error('Ollama API error:', error.message);
    throw new Error(`Failed to call Ollama: ${error.message}`);
  }
};

const checkOllamaHealth = async () => {
  try {
    const response = await axios.get(`${OLLAMA_API_URL}/api/tags`);
    return response.status === 200;
  } catch (error) {
    console.error('Ollama health check failed:', error.message);
    return false;
  }
};

module.exports = {
  callOllama,
  checkOllamaHealth
};
