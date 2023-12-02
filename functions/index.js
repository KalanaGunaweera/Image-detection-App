/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: true }));

app.post('/proxy', async (req, res) => {
    try {
        const apiUrl = 'https://europe-west1-promiseq-production2.cloudfunctions.net/sendToThreatDetect'; // Replace with the actual external API endpoint
        const requestData = req.body.image; // Forward the entire request body
        
        const headers = {
            'promiseq-subscription-key': '$PROMISEQ_KEY'
          };

        var formData = new FormData();
        formData.append("url", requestData);
        console.log("image url " + requestData);

        // Make a request to the external API
        const response = await axios.post(apiUrl, formData, { headers: headers });
        console.log("Result data - "+ (response.data));

        // Forward the external API response to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

exports.api = functions.https.onRequest(app);