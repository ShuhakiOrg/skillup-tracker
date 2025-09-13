const router = express.Router();
const admin = require('../firebase_admin'); // Firebase Admin SDK
const User = require('../models/User');

// Save FCM token for a user
router.post('/save-token', async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) return res.status(400).json({ success: false, message: 'userId and token required' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (!user.fcmTokens.includes(token)) {
      user.fcmTokens.push(token);
      await user.save();
    }

    res.json({ success: true, fcmTokens: user.fcmTokens });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

//send notifications to user
router.post('/send', async (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) return res.status(400).json({ success: false, message: 'Missing fields' });

  try {
    const user = await User.findById(userId);
    if (!user || !user.fcmTokens.length) return res.status(404).json({ success: false, message: 'No FCM tokens' });

    const message = {
      notification: { title, body },
      tokens: user.fcmTokens,
    };

    const response = await admin.messaging().sendMulticast(message);

    // Remove invalid tokens
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        user.fcmTokens = user.fcmTokens.filter(t => t !== message.tokens[idx]);
      }
    });

    await user.save();

    res.json({ success: true, response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;
