/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import * as logger from "firebase-functions/logger";
// import { onRequest } from "firebase-functions/v1/https";

import * as functions from 'firebase-functions';

// import { auth } from "firebase-admin";
// import { initializeApp } from 'firebase-admin/app';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const firebaseConfig = {
  apiKey: "AIzaSyAvtRxG3RuWD-Z9U31l9CzSh8kPEc2CWP4",
  authDomain: "skitab-57521.firebaseapp.com",
  databaseURL: "https://skitab-57521-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "skitab-57521",
  storageBucket: "skitab-57521.appspot.com",
  messagingSenderId: "950595570395",
  appId: "1:950595570395:web:b2bd7990c9e72e73471afe",
  measurementId: "G-BND4XB76ZG"
};

const admin = require("firebase-admin");
admin.initializeApp(firebaseConfig);

const cors = require("cors")({origin:true});

export const deleteUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, () => {
    const userEmail = request.body.userEmail;
    admin.auth().getUserByEmail(userEmail)
      .then(function (userRecord:any) {
        const uid = userRecord.uid;
        admin.auth().deleteUser(uid)
          .then( () => {
            console.log('User deleted');
            response.status(200).send('User deleted');
          })
          .catch(() => {
            console.log('Error deleting user');
            response.status(500).send('Failed to delete user');
          });
      })
      .catch(() => {
        console.log('Error fetching user');
        response.status(500).send('Failed while fetching user');
      })
  })
});