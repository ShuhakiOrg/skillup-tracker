const cron = require("node-cron");
const User = require("./models/User");
const admin = require("./firebase_admin");

// Run every Monday at 10:00 AM
cron.schedule("0 10 * * MON", async () => {
  console.log("Running weekly notifications...");

  try {
    // Fetch users with saved FCM tokens
    const users = await User.find({ fcmTokens: { $exists: true, $ne: [] } })
                            .sort({ totalModulesCompleted: -1 }); // highest first

    if (!users.length) return;

    const totalUsers = users.length;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const percentile = (i + 1) / totalUsers; // 0 = top, 1 = bottom

      let messageBody;

      if (percentile <= 0.2) {
        messageBody = "🔥 Keep the grind going! You're among the top learners!";
      } else if (percentile <= 0.4) {
        messageBody = "⏰ Practice time! Push to the top!";
      } else {
        messageBody = "💪 Time to solve a problem today and level up!";
      }

      // Send notification to all devices for this user
      await admin.messaging().sendMulticast({
        notification: {
          title: "Weekly SkillUp Reminder",
          body: messageBody,
        },
        tokens: user.fcmTokens,
      });
    }

    console.log(" Weekly notifications sent successfully ");
  } catch (err) {
    console.error("Error sending weekly notifications:", err);
  }
});
