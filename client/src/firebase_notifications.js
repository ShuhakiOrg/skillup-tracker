import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase"; // import initialized messaging
import axios from "axios";

const userId = "REPLACE_WITH_LOGGED_IN_USER_ID"; 

// Request permission and get FCM token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted ");

      // Get the FCM token
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_vapidKey, 
      });

      if (token) {
        console.log("FCM Token:", token);

        // Send token to backend for storage
        await axios.post("http://localhost:5000/api/notifications/save-token", {
          token,userId
        });

        return token;
      } else {
        console.warn("No registration token available. Request permission again.");
      }
    } else {
      console.log("Notification permission denied ");
    }
  } catch (error) {
    console.error("Error getting notification permission or token:", error);
  }
};

// Listen for foreground notifications
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
      resolve(payload);
    });
  });
