const express = require('express');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

// A simple route to send notification
app.post('/send-notification', async (req, res) => {
  console.log('Received request:', req.body);  // Log the request body

  const { token, title, body } = req.body;

  const message = {
    notification: {
      title: title || 'Default Title',
      body: body || 'Default Body',
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    res.status(200).send('Notification sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending notification.');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
