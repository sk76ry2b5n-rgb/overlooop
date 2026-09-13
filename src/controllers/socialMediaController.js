const { postToInstagram } = require('../services/instagramService');
const { postToFacebook } = require('../services/facebookService');
const { postToTwitter } = require('../services/twitterService');

const createPost = async (req, res) => {
  try {
    const { platform, content, media, caption } = req.body;

    let result;

    switch (platform.toLowerCase()) {
      case 'instagram':
        result = await postToInstagram({ content, media, caption });
        break;
      case 'facebook':
        result = await postToFacebook({ content, media, caption });
        break;
      case 'twitter':
        result = await postToTwitter({ content, caption });
        break;
      default:
        return res.status(400).json({ error: 'Unsupported platform' });
    }

    res.json({
      success: true,
      platform,
      postId: result.id,
      message: 'Post created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const schedulePost = async (req, res) => {
  try {
    const { platform, content, scheduledTime } = req.body;

    // Implementation for scheduling posts
    res.json({
      success: true,
      platform,
      scheduledTime,
      message: 'Post scheduled successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { platform, postId } = req.query;

    // Implementation for fetching analytics
    res.json({
      success: true,
      platform,
      postId,
      analytics: {
        likes: 0,
        comments: 0,
        shares: 0,
        impressions: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  schedulePost,
  getAnalytics
};
