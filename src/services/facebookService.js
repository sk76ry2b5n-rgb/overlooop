const axios = require('axios');

const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_API_URL = 'https://graph.facebook.com/v18.0';

const postToFacebook = async ({ content, media, caption }) => {
  try {
    const response = await axios.post(
      `${FACEBOOK_API_URL}/me/feed`,
      {
        message: caption || content,
        link: media,
        access_token: FACEBOOK_ACCESS_TOKEN
      }
    );

    return {
      id: response.data.id,
      success: true
    };
  } catch (error) {
    console.error('Facebook post error:', error.message);
    throw error;
  }
};

module.exports = {
  postToFacebook
};
