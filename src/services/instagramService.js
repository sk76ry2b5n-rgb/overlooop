const axios = require('axios');

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_API_URL = 'https://graph.instagram.com/v18.0';

const postToInstagram = async ({ content, media, caption }) => {
  try {
    // Instagram API call
    const response = await axios.post(
      `${INSTAGRAM_API_URL}/me/media`,
      {
        image_url: media,
        caption: caption || content,
        access_token: INSTAGRAM_ACCESS_TOKEN
      }
    );

    return {
      id: response.data.id,
      success: true
    };
  } catch (error) {
    console.error('Instagram post error:', error.message);
    throw error;
  }
};

module.exports = {
  postToInstagram
};
