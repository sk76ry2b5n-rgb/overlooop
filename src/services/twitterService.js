const axios = require('axios');

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_API_URL = 'https://api.twitter.com/2';

const postToTwitter = async ({ content, caption }) => {
  try {
    const response = await axios.post(
      `${TWITTER_API_URL}/tweets`,
      {
        text: caption || content
      },
      {
        headers: {
          'Authorization': `Bearer ${TWITTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      id: response.data.data.id,
      success: true
    };
  } catch (error) {
    console.error('Twitter post error:', error.message);
    throw error;
  }
};

module.exports = {
  postToTwitter
};
