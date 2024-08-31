/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.resetDailyFortunes = functions.pubsub.schedule('0 0 * * *')
    .timeZone('Asia/Kolkata') // Set the timezone to IST
    .onRun(async (context) => {
        const usersRef = admin.firestore().collection('test-users');
        const snapshot = await usersRef.get();

        const batch = admin.firestore().batch();

        snapshot.forEach((doc) => {
            batch.update(doc.ref, { REMAINING_COINS: 2 });
        });

        await batch.commit();
        console.log('Daily fortunes reset for all users.');
    });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
